// Show form
function showCreate() {
    $("#fishForm").show();
    $("#fishTable").hide();
    $("#showCreateButton").hide();
}

// Show table
function showViewAll() {
    $("#fishForm").hide();
    $("#fishTable").show();
    $("#showCreateButton").show();
}

// Add fish to table
function addFishToTable(fish) {
    let row = `
        <tr id="${fish.id}">
            <td>${fish.id}</td>
            <td>${fish.species}</td>
            <td>${fish.location}</td>
            <td>${fish.weight}</td>
            <td><button onclick="showUpdate('${fish.id}')">Update</button></td>
            <td><button onclick="deleteFish('${fish.id}')">Delete</button></td>
        </tr>
    `;
    $("#fishTable tbody").append(row);
}

// Get all fish (AJAX)
function getAllFish() {
    $.ajax({
        url: "/fish",
        method: "GET",
        success: function(data) {
            $("#fishTable tbody").empty();
            data.forEach(addFishToTable);
        },
        error: function(err) {
            console.log("Error:", err);
        }
    });
}

// Create fish
function createFish(fish) {
    $.ajax({
        url: "/fish",
        method: "POST",
        data: JSON.stringify(fish),
        contentType: "application/json",
        success: function(newFish) {
            addFishToTable(newFish);
            showViewAll();
        }
    });
}

// Delete fish
function deleteFish(id) {
    $.ajax({
        url: "/fish/" + id,
        method: "DELETE",
        success: function() {
            $("#" + id).remove();
        }
    });
}

// Handle Save button
$("#saveBtn").click(function() {
    let fish = {
        species: $("input[name='species']").val(),
        location: $("input[name='location']").val(),
        weight: $("input[name='weight']").val()
    };

    createFish(fish);
});

// Cancel button
$("#cancelBtn").click(function() {
    showViewAll();
});

// Show create form button
$("#showCreateButton").click(function() {
    showCreate();
});

// Load data on page load
$(document).ready(function() {
    getAllFish();
});