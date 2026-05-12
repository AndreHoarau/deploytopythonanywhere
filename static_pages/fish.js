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
        <tr id="${fish.fishId}">
            <td>${fish.fishId}</td>
            <td>${fish.species}</td>
            <td>${fish.location_name}</td>
            <td>${fish.weight}</td>
            <td><button onclick="showUpdate('${fish.fishId}')">Update</button></td>
            <td><button onclick="deleteFish('${fish.fishId}')">Delete</button></td>
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
        sizecm: parseFloat($("input[name='sizecm']").val()), // Added this
        weight: parseFloat($("input[name='weight']").val()),
        location_name: $("input[name='location_name']").val(), // Updated to match HTML name
        lure: $("input[name='lure']").val(), // Added this
        picture_link: $("input[name='picture_link']").val() // Added this
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