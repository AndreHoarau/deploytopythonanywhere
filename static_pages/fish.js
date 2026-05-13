/* =========================================================================
   Fish Tracker — jQuery AJAX CRUD (species, sizecm, weight, location, lure, picture)
   ========================================================================= */

const ENDPOINT = "/fish";
let allFish = []; // Local cache of your database data

// ------------------------------ AJAX Helper ---------------------------------
/**
 * Helper to handle JSON requests consistently
 */
function api(method, path, data) {
    return $.ajax({
        url: path,
        method: method,
        contentType: data ? "application/json; charset=utf-8" : undefined,
        dataType: "json",
        data: data ? JSON.stringify(data) : undefined,
    });
}

// ------------------------------ Rendering ---------------------------------
/**
 * Clears and rebuilds the table based on the provided array
 */
function renderFish(fishList) {
    const $tbody = $("#fishTable tbody");
    $tbody.empty();

    if (fishList.length === 0) {
        $tbody.append(`<tr><td colspan="9" style="text-align:center;">No fish logged yet.</td></tr>`);
        return;
    }

    fishList.forEach(fish => {
        const row = `
            <tr data-id="${fish.fishId}">
                <td>${fish.fishId}</td>
                <td>${fish.species}</td>
                <td>${fish.location_name}</td>
                <td>${fish.weight}</td>
                <td>${fish.sizecm}</td>
                <td>${fish.lure}</td>
                <td>${fish.picture_link}</td>
                <td>
                    <button class="btn-edit">Edit</button>
                </td>
                <td>
                    <button class="btn-delete">Delete</button>
                </td>
            </tr>`;
        $tbody.append(row);
    });
}

// ------------------------------ UI Management -----------------------------

function showForm(mode = "create") {
    $("#fishTable").hide();
    $("#showCreateButton").hide();
    $("#fishForm").show();
    
    if (mode === "create") {
        $("#formTitle").text("Add New Catch");
        $("#saveBtn").text("Save");
    } else {
        $("#formTitle").text("Update Existing Catch");
        $("#saveBtn").text("Update");
    }
}

function hideForm() {
    $("#fishForm").hide();
    $("#fishTable").show();
    $("#showCreateButton").show();
    resetForm();
}

function resetForm() {
    // Clears all inputs including the hidden ID
    $("#fishForm input").val(""); 
}

// ------------------------------ CRUD Operations ---------------------------

async function loadAllFish() {
    try {
        const data = await api("GET", ENDPOINT);
        allFish = data; 
        renderFish(allFish);
    } catch (err) {
        console.error("Failed to load fish:", err);
    }
}

async function createFish(payload) {
    try {
        const created = await api("POST", ENDPOINT, payload);
        allFish.push(created); 
        renderFish(allFish);
    } catch (err) {
        console.error("Create failed:", err);
    }
}

async function updateFish(id, payload) {
    try {
        const updated = await api("PUT", `${ENDPOINT}/${id}`, payload);
        const index = allFish.findIndex(f => String(f.fishId) === String(id));
        if (index !== -1) allFish[index] = updated;
        renderFish(allFish);
    } catch (err) {
        console.error("Update failed:", err);
    }
}

async function deleteFish(id) {
    if (!confirm("Are you sure you want to delete this catch?")) return;
    try {
        await api("DELETE", `${ENDPOINT}/${id}`);
        allFish = allFish.filter(f => String(f.fishId) !== String(id));
        renderFish(allFish);
    } catch (err) {
        console.error("Delete failed:", err);
    }
}

// ------------------------------ Event Handlers ----------------------------

$(document).ready(function() {
    // Initial data load
    loadAllFish();

    // Add Fish Button
    $("#showCreateButton").on("click", function() {
        resetForm();
        showForm("create");
    });

    // Save/Update Button
    $("#saveBtn").on("click", async function() {
        const id = $("input[name='fishId']").val();
        const payload = {
            species: $("input[name='species']").val(),
            sizecm: parseFloat($("input[name='sizecm']").val()) || 0,
            weight: parseFloat($("input[name='weight']").val()) || 0,
            location_name: $("input[name='location_name']").val(),
            lure: $("input[name='lure']").val(),
            picture_link: $("input[name='picture_link']").val()
        };

        if (id) {
            await updateFish(id, payload);
        } else {
            await createFish(payload);
        }
        hideForm();
    });

    // Edit Button (Delegated)
    $("#fishTable tbody").on("click", ".btn-edit", function() {
        const id = $(this).closest("tr").data("id");
        const fish = allFish.find(f => String(f.fishId) === String(id));
        
        if (fish) {
            $("input[name='fishId']").val(fish.fishId);
            $("input[name='species']").val(fish.species);
            $("input[name='sizecm']").val(fish.sizecm);
            $("input[name='weight']").val(fish.weight);
            $("input[name='location_name']").val(fish.location_name);
            $("input[name='lure']").val(fish.lure);
            $("input[name='picture_link']").val(fish.picture_link);
            
            showForm("edit");
        }
    });

    // Delete Button (Delegated)
    $("#fishTable tbody").on("click", ".btn-delete", function() {
        const id = $(this).closest("tr").data("id");
        deleteFish(id);
    });

    // Cancel Button
    $("#cancelBtn").on("click", hideForm);
});