// Business Logic
import { Pain2 } from './assays/pain2.js';
import { Antidepressants } from './assays/antidepressants.js';
import { Gaba } from './assays/gaba.js';
import { ETG } from './assays/etg.js';
import { BTHC } from './assays/bthc.js';
import { DLMeth } from './assays/dlmeth.js';
import { Pain3 } from './assays/pain3.js';
import { AMPoff } from './assays/ampoff.js';
import { Creatinine } from './assays/creatinine.js';
import { OralFluids } from './assays/oralfluids.js';
import { Synthetic } from './assays/synthetics.js';
import { Testosterone } from './assays/testosterone.js';
import { tfvDP } from './assays/tfvdp.js';
import { vitD } from './assays/vitd.js';

async function sendAssayData(assayData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assayData), // Send the assay data as JSON
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Assay data saved successfully:', result);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Call the function for each assay
sendAssayData(AMPoff);
sendAssayData(Antidepressants);
sendAssayData(BTHC);
sendAssayData(Creatinine);
sendAssayData(DLMeth);
sendAssayData(ETG);
sendAssayData(Gaba);
sendAssayData(OralFluids);
sendAssayData(Pain2);
sendAssayData(Pain3);
sendAssayData(Synthetic);
sendAssayData(Testosterone);
sendAssayData(tfvDP);
sendAssayData(vitD);



const assayData = {
  Pain2,
  Antidepressants,
  Gaba,
  ETG,
  BTHC,
  DLMeth,
  Pain3,
  AMPoff,
  Creatinine,
  OralFluids,
  Synthetic,
  Testosterone,
  tfvDP,
  vitD
};
// Function to fetch assay data from the server
async function fetchAssayData() {
  console.log('Fetching assay data from the server...'); // Log before fetching
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with actual endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Log the fetched data
    console.log('Fetched data:', data);

    // Update assayData with the fetched data
    Object.assign(assayData, data);

    // Log after updating assayData
    console.log('assayData updated successfully:', assayData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // Handle error (e.g., fallback to defaults or notify the user)
  }
}

// Call the fetch function to initialize data
fetchAssayData();

let establishedMeans = {};
let istdAnalytes = {};

// Initialize data for all assays
for (const assay in assayData) {
  establishedMeans[assay] = JSON.parse(localStorage.getItem(`${assay}EstablishedMeans`)) || { ...assayData[assay].defaultEstablishedMeans };
  istdAnalytes[assay] = JSON.parse(localStorage.getItem(`${assay}IstdAnalytes`)) || { ...assayData[assay].defaultIstdAnalytes };
}
//initialize data for assays, retrieve from server instead of local storage
//async function fetchMeansFromServer(assay) {
//try {
//const response = await fetch(`https://jsonplaceholder.typicode.com/posts`); // Replace with  actual endpoint
//if (!response.ok) {
//throw new Error('Network response was not ok');
//}
//const data = await response.json();

// Update establishedMeans and istdAnalytes with the fetched data
//establishedMeans[assay] = data.establishedMeans || { ...assayData[assay].defaultEstablishedMeans };
//istdAnalytes[assay] = data.istdAnalytes || { ...assayData[assay].defaultIstdAnalytes };
//} catch (error) {
//console.error('There was a problem with the fetch operation:', error);
// Handle error (e.g., fallback to defaults or notify the user)
//}
//}

// Call this function for each assay to initialize means
//for (const assay in assayData) {
//fetchMeansFromServer(assay);
//}

function saveEstablishedMeans(assay) {
  const updatedMeans = {};

  for (const analyte in establishedMeans[assay]) {
    if (establishedMeans[assay].hasOwnProperty(analyte)) {
      const peakArea = parseFloat(document.getElementById(`peakArea_${analyte}`).value);
      const retentionTimeMin = parseFloat(document.getElementById(`retentionTimeMin_${analyte}`).value);
      const retentionTimeMax = parseFloat(document.getElementById(`retentionTimeMax_${analyte}`).value);
      updatedMeans[analyte] = {
        peakArea,
        retentionTime: {
          min: retentionTimeMin,
          max: retentionTimeMax
        }
      };
    }
  }

  establishedMeans[assay] = { ...updatedMeans };
  // Send updated means to the server
  //try {
  //const response = await fetch(`https://jsonplaceholder.typicode.com/api/assays/${assay}/means`, {
  //method: 'PUT',
  //headers: {
  //'Content-Type': 'application/json',
  //},
  //body: JSON.stringify({ establishedMeans: establishedMeans[assay] }),
  //});

  //if (!response.ok) {
  //throw new Error('Network response was not ok');
  //}

  //const result = await response.json();
  //console.log(`Updated Established Means for ${assay}:`, result);
  //alert(`Established means for ${assay} have been saved successfully!`);
  //} catch (error) {
  //console.error('There was a problem with the fetch operation:', error);
  //}
  //}
  localStorage.setItem(`${assay}EstablishedMeans`, JSON.stringify(establishedMeans[assay]));
  console.log(`Updated Established Means for ${assay}:`, establishedMeans[assay]);
  alert(`Established means for ${assay} have been saved successfully!`);
}

function saveISTDAnalytes(assay) {
  const updatedISTD = {};

  for (const analyte in istdAnalytes[assay]) {
    if (istdAnalytes[assay].hasOwnProperty(analyte)) {
      const peakAreaInput = document.getElementById(`istdPeakArea_${analyte}`);
      const retentionTimeMinInput = document.getElementById(`istdRetentionTimeMin_${analyte}`);
      const retentionTimeMaxInput = document.getElementById(`istdRetentionTimeMax_${analyte}`);

      // Log the inputs to check if they exist
      console.log(`Peak Area Input for ${analyte}:`, peakAreaInput);
      console.log(`RT Min Input for ${analyte}:`, retentionTimeMinInput);
      console.log(`RT Max Input for ${analyte}:`, retentionTimeMaxInput);

      // Check if inputs exist
      if (!peakAreaInput || !retentionTimeMinInput || !retentionTimeMaxInput) {
        console.error(`Input elements for analyte ${analyte} not found.`);
        continue; // Skip this analyte if any input is missing
      }

      // Get values from inputs
      const peakArea = parseFloat(peakAreaInput.value);
      const retentionTimeMin = parseFloat(retentionTimeMinInput.value);
      const retentionTimeMax = parseFloat(retentionTimeMaxInput.value);

      // Update the analyte data
      updatedISTD[analyte] = {
        peakArea,
        retentionTime: {
          min: retentionTimeMin,
          max: retentionTimeMax
        }
      };
    }
  }

  // Save updated ISTD analytes
  istdAnalytes[assay] = { ...updatedISTD };
  // Save updated ISTD analytes to the server
  //try {
  //const response = await fetch(`https://jsonplaceholder.typicode.com/api/assays/${assay}/istd-analytes`, {
  //method: 'PUT'
  //headers: {
  //'Content-Type': 'application/json',
  //},
  //body: JSON.stringify({ istdAnalytes: istdAnalytes[assay] }), // Send the updated ISTD analytes as JSON
  //});

  //if (!response.ok) {
  //throw new Error('Network response was not ok');
  //}

  //const result = await response.json();
  //console.log(`Updated ISTD Analytes for ${assay}:`, result);
  //alert(`ISTD analytes for ${assay} have been saved successfully!`);
  //} catch (error) {
  //console.error('There was a problem with the fetch operation:', error);
  //}
  //}
  localStorage.setItem(`${assay}IstdAnalytes`, JSON.stringify(istdAnalytes[assay]));
  console.log(`Updated ISTD Analytes for ${assay}:`, istdAnalytes[assay]);
  alert(`ISTD analytes for ${assay} have been saved successfully!`);
}



document.getElementById("assay").addEventListener("change", function () {
  let assaySelection = '';
  assaySelection = this.value;
  console.log("Selected assay:", assaySelection);
  console.log("Assay data:", assayData[assaySelection]);

  const lcmsDropdown = document.getElementById("lcms");
  const toggleMeansButton = document.getElementById("toggleMeansBtn");
  const toggleISTDButton = document.getElementById("toggleISTDBtn");

  lcmsDropdown.innerHTML = '<option value="">Select an instrument</option>';
  lcmsDropdown.disabled = true;
  toggleMeansButton.disabled = true;
  toggleISTDButton.disabled = true;

  if (assayInstruments[assaySelection]) { // Use assayInstruments instead of assayData
    console.log("Instruments for selected assay:", assayInstruments[assaySelection]);
    assayInstruments[assaySelection].forEach(instrument => {
      const option = document.createElement('option');
      option.value = option.textContent = instrument;
      lcmsDropdown.appendChild(option);
    });
    lcmsDropdown.disabled = false;
    toggleMeansButton.disabled = false;
    toggleISTDButton.disabled = false;
  } else {
    console.log("No data found for selected assay");
  }

  // Clear and hide the means containers
  document.getElementById('establishedMeansContainer').innerHTML = '';
  document.getElementById('istdContainer').innerHTML = '';
  document.getElementById('establishedMeansContainer').classList.add('collapsed');
  document.getElementById('istdContainer').classList.add('collapsed');
  document.getElementById('toggleMeansBtn').textContent = 'Show Parent Analyte Means';
  document.getElementById('toggleISTDBtn').textContent = 'Show ISTD Means';
});

function analyzeData() {
  // Load saved means from local storage/from server:fetchMeansFromServer();
  const currentAssay = document.getElementById('assay').value;
  //const savedMeans = JSON.parse(localStorage.getItem('establishedMeans')) || {};
  //const means = savedMeans[currentAssay] || {}; // Get means for the current assay

  // Debugging log to check the means object
  //console.log("Loaded means for current assay:", means);

  const fileInput = document.getElementById('fileUpload');
  if (!fileInput.files.length) {
    alert('Please upload a CSV file before analyzing data.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const csvData = event.target.result;
    const rows = csvData.split('\n').map(row => row.split(',')); // Split CSV into rows and columns

    // Check if the CSV has the expected number of columns
    const expectedColumnCount = 32; // Set this to the expected number of columns
    if (rows.length < 2 || rows[0].length !== expectedColumnCount) {
      alert('The uploaded CSV file does not match the required format. Please check the file.');
      return; // Exit if the format is invalid
    }

    let passCount = 0;
    let failCount = 0;
    const results = [];
    let batchName = '';

    const expectedAnalytes = new Set([
      ...Object.keys(assayData[currentAssay].defaultEstablishedMeans),
      ...Object.keys(assayData[currentAssay].defaultIstdAnalytes)
    ]);
    console.log("Expected analytes count:", expectedAnalytes.size);

    const processedAnalytes = new Set();

    const findMeanValues = (analyte) => {
      // Try exact match first
      if (establishedMeans[currentAssay][analyte]) {
        return establishedMeans[currentAssay][analyte];
      }
      if (istdAnalytes[currentAssay][analyte]) {
        return istdAnalytes[currentAssay][analyte];
      }

      // Try replacing hyphens with underscores
      const underscoreAnalyte = analyte.replace(/-/g, '_');
      if (establishedMeans[currentAssay][underscoreAnalyte]) {
        return establishedMeans[currentAssay][underscoreAnalyte];
      }
      if (istdAnalytes[currentAssay][underscoreAnalyte]) {
        return istdAnalytes[currentAssay][underscoreAnalyte];
      }

      // Try replacing underscores with hyphens
      const hyphenAnalyte = analyte.replace(/_/g, '-');
      if (establishedMeans[currentAssay][hyphenAnalyte]) {
        return establishedMeans[currentAssay][hyphenAnalyte];
      }
      if (istdAnalytes[currentAssay][hyphenAnalyte]) {
        return istdAnalytes[currentAssay][hyphenAnalyte];
      }

      return null;
    };

    rows.forEach(row => {
      // Check if the row is empty (i.e., has no columns)
      if (row.length === 0 || row[0].trim() === '') return; // Check if the first column is empty

      const columns = row.map(item => item.trim()); // Trim each column
      batchName = columns[0];
      const analyte = columns[4];

      // Log the analyte if it contains 'THC'
      if (analyte.includes('THC')) {
        console.log('THC-related analyte found:', analyte);
      }

      if (!establishedMeans[currentAssay][analyte] && !istdAnalytes[currentAssay][analyte]) {
        console.log('Analyte not found in established means or ISTD:', analyte);
      }

      const retentionTime = parseFloat(columns[14]);
      const peakArea = parseFloat(columns[15]);

      if (!analyte || isNaN(peakArea) || isNaN(retentionTime)) return;

      let meanValues = findMeanValues(analyte);
      if (!meanValues) {
        console.log('No mean values found for analytes:', analyte);
        return;
      }

      const peakAreaPass = peakArea >= meanValues.peakArea;
      const retentionTimePass = retentionTime >= meanValues.retentionTime.min && retentionTime <= meanValues.retentionTime.max;

      results.push({ analyte, peakArea, retentionTime, peakAreaPass, retentionTimePass });

      if (peakAreaPass && retentionTimePass) {
        passCount++;
      } else {
        failCount++;
      }

      processedAnalytes.add(analyte);
    });

    console.log("Processed analytes count:", processedAnalytes.size);

    const missingAnalytes = [...expectedAnalytes].filter(analyte => !processedAnalytes.has(analyte));
    console.log("Missing analytes:", missingAnalytes);

    const unexpectedAnalytes = [...processedAnalytes].filter(analyte => !expectedAnalytes.has(analyte));
    console.log("Unexpected analytes:", unexpectedAnalytes);

    if (!batchName) {
      console.error('Batch name is undefined. Please check the CSV file.');
      return;
    }

    console.log("Total analytes processed:", results.length);
    console.log("Pass count:", passCount);
    console.log("Fail count:", failCount);

    const totalAnalytes = passCount + failCount; // Total number of analytes processed
    const runResult = passCount >= totalAnalytes / 2 ? 'PASS' : 'FAIL'; // Determine overall result

    console.log("Overall result for run:", runResult); // Debugging log

    // Call displayResults with the calculated runResult
    displayResults(results, passCount, failCount, runResult);

    saveRun(document.getElementById('lcms').value,
      document.getElementById('assay').value,
      batchName,
      runResult,
      csvData);
  };

  reader.onerror = function (error) {
    console.error('Error reading file:', error);
  };

  reader.readAsText(fileInput.files[0]);
}

function displayResults(results, passCount, failCount, runResult) {
  const resultsDisplay = document.getElementById('resultsDisplay'); // Get the results display div
  if (!resultsDisplay) {
    console.error("Results display div not found!");
    return;
  }

  resultsDisplay.innerHTML = ''; // Clear previous results

  const totalAnalytes = passCount + failCount;

  resultsDisplay.innerHTML = `
    <h2>Overall Result: ${runResult}</h2>
    <p>Total Analytes: ${totalAnalytes}</p>
    <p>Passed: ${passCount} (${((passCount / totalAnalytes) * 100).toFixed(2)}%)</p>
    <p>Failed: ${failCount} (${((failCount / totalAnalytes) * 100).toFixed(2)}%)</p>
    <hr>
  `;

  results.forEach(result => {
    const analyteDiv = document.createElement('div');
    analyteDiv.classList.add('analyte-result');
    analyteDiv.innerHTML = `
      <h3>${result.analyte}</h3>
      <p>Peak Area: ${result.peakArea} (${result.peakAreaPass ? 'Pass' : 'Fail'})</p>
      <p>Retention Time: ${result.retentionTime} (${result.retentionTimePass ? 'Pass' : 'Fail'})</p>
      <hr>
    `;
    resultsDisplay.appendChild(analyteDiv);
  });
}

function saveRun(instrument, assay, batchName, result, csvData) {
  const previousRuns = JSON.parse(localStorage.getItem('previousRuns')) || [];
  const newRun = {
    instrument: instrument,
    assay: assay,
    batchName: batchName,
    result: result, // Ensure this is being set correctly
    data: csvData,
    timestamp: Date.now()
  };
  console.log("Saving run:", newRun);
  previousRuns.push(newRun);
  localStorage.setItem('previousRuns', JSON.stringify(previousRuns));
}
//async function saveRun(instrument, assay, batchName, result, csvData) {
//const newRun = {
//instrument: instrument,
//assay: assay,
//batchName: batchName,
//result: result, // Ensure this is being set correctly
//data: csvData,
//timestamp: Date.now()
//};

//console.log("Saving run:", newRun);

//try {
//const response = await fetch('https://jsonplaceholder.com/api/runs', { 
//method: 'POST',
//headers: {
//'Content-Type': 'application/json',
//},
//body: JSON.stringify(newRun),
//});

//if (!response.ok) {
//throw new Error('Network response was not ok');
//}

//const resultData = await response.json(); // Assuming the server returns some data
//console.log("Run saved successfully:", resultData);
//} catch (error) {
//console.error('There was a problem with the fetch operation:', error);
//}
//}

// Wrap code in an IIFE to avoid polluting the global scope, but expose necessary functions
(function () {
  // Global searchRuns function
  window.searchRuns = function () {
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    let searchInput;

    switch (searchType) {
      case 'assay':
        searchInput = document.getElementById('assaySearch').value;
        break;
      case 'instrument':
        searchInput = document.getElementById('instrumentSearch').value;
        break;
      case 'batch':
        searchInput = document.getElementById('batchSearch').value.trim().toLowerCase();
        break;
    }

    // If no search input is provided, don't perform a search
    if (!searchInput) {
      console.log("No search input provided");
      return;
    }

    const previousRuns = JSON.parse(localStorage.getItem('previousRuns')) || [];

    console.log("Search type:", searchType);
    console.log("Search input:", searchInput);
    console.log("Total previous runs:", previousRuns.length);

    const filteredRuns = previousRuns.filter(run => {
      if (!run) return false; // Skip if run is undefined or null

      switch (searchType) {
        case 'assay':
          return run.assay && run.assay === searchInput;
        case 'instrument':
          return run.instrument && run.instrument === searchInput;
        case 'batch':
          return run.batchName && run.batchName.toLowerCase().includes(searchInput);
        default:
          return false;
      }
    });

    console.log("Filtered runs:", filteredRuns.length);

    displayFilteredRuns(filteredRuns);
  };
  /* async function fetchPreviousRuns() {
    try {
      const response = await fetch('https://jsonplaceholder.com/api/runs'); // Replace with actual server endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const previousRuns = await response.json();
      return previousRuns; // Return the fetched runs
    } catch (error) {
      console.error('Error fetching previous runs:', error);
      return []; // Return an empty array on error
    }
  }
  
  window.searchRuns = async function () {
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    let searchInput;
  
    switch (searchType) {
      case 'assay':
        searchInput = document.getElementById('assaySearch').value;
        break;
      case 'instrument':
        searchInput = document.getElementById('instrumentSearch').value;
        break;
      case 'batch':
        searchInput = document.getElementById('batchSearch').value.trim().toLowerCase();
        break;
    }
  
    if (!searchInput) {
      console.log("No search input provided");
      return;
    }
  
    const previousRuns = await fetchPreviousRuns(); // Fetch runs from the server
  
    console.log("Search type:", searchType);
    console.log("Search input:", searchInput);
    console.log("Total previous runs:", previousRuns.length);
  
    const filteredRuns = previousRuns.filter(run => {
      if (!run) return false; // Skip if run is undefined or null
  
      switch (searchType) {
        case 'assay':
          return run.assay && run.assay === searchInput;
        case 'instrument':
          return run.instrument && run.instrument === searchInput;
        case 'batch':
          return run.batchName && run.batchName.toLowerCase().includes(searchInput);
        default:
          return false;
      }
    });
  
    console.log("Filtered runs:", filteredRuns.length);
    displayFilteredRuns(filteredRuns);
  }; */

  function initializeSearch() {
    const searchTypeRadios = document.querySelectorAll('input[name="searchType"]');
    const searchInputContainer = document.getElementById('searchInputContainer');
    const searchBtn = document.getElementById('searchBtn');

    // Function to create the appropriate search input based on the selected search type
    function createSearchInput(searchType) {
      let inputHTML = '';
      switch (searchType) {
        case 'assay':
          inputHTML = `
            <select id="assaySearch">
              <option value="">Select Assay</option>
              <option value="AMPoff">AMPoff</option>
              <option value="Antidepressants">Antidepressants</option>
              <option value="BTHC">BTHC</option>
              <option value="Creatinine">Creatinine</option>
              <option value="DLMeth">DL Meth</option>
              <option value="ETG">ETG</option>
              <option value="Gaba">Gaba</option>
              <option value="OralFluids">OralFluids</option>
              <option value="Pain2">Pain2</option>
              <option value="Pain3">Pain3</option>
              <option value="Synthetic">Synthetic</option>
              <option value="Testosterone">Testosterone</option>
              <option value="tfvDP">TFV-DP</option>
              <option value="vitD">VitD</option>
            </select>
          `;
          break;
        case 'instrument':
          inputHTML = `
            <select id="instrumentSearch">
              <option value="">Select Instrument</option>
              <option value="LCMS 1">LCMS 1</option>
              <option value="LCMS 2">LCMS 2</option>
              <option value="LCMS 3">LCMS 3</option>
              <option value="LCMS 4">LCMS 4</option>
              <option value="LCMS 5">LCMS 5</option>
              <option value="LCMS 6">LCMS 6</option>
              <option value="LCMS 7">LCMS 7</option>
              <option value="LCMS 9">LCMS 9</option>
              <option value="LCMS 10">LCMS 10</option>
              <option value="LCMS 15">LCMS 15</option>
              <option value="LCMS 16">LCMS 16</option>
              <option value="LCMS 17">LCMS 17</option>
            </select>
          `;
          break;
        case 'batch':
          inputHTML = `<input type="text" id="batchSearch" placeholder="Enter Batch Name">`;
          break;
      }
      searchInputContainer.innerHTML = inputHTML;

      // Add event listener for 'Enter' key on batch search input
      if (searchType === 'batch') {
        document.getElementById('batchSearch').addEventListener('keypress', function (event) {
          if (event.key === 'Enter') {
            searchRuns();
          }
        });
      }
    }

    // Set up initial search input
    createSearchInput('assay');

    // Update search input when radio selection changes
    searchTypeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        createSearchInput(e.target.value);
      });
    });

    // Add event listener to the search button
    searchBtn.addEventListener('click', searchRuns);
  }

  function displayFilteredRuns(runs) {
    const previousRunsDiv = document.getElementById('previousRuns');
    previousRunsDiv.innerHTML = '';

    if (runs.length === 0) {
      previousRunsDiv.innerHTML = '<p>No matching runs found.</p>';
      return;
    }

    runs.forEach(run => {
      const runDiv = document.createElement('div');
      runDiv.classList.add('run-result');
      runDiv.innerHTML = `
        <h3>Instrument: ${run.instrument || 'N/A'}</h3>
        <p>Assay: ${run.assay || 'N/A'}</p>
        <p>Batch: ${run.batchName || 'N/A'}</p>
        <p>Result: ${run.result || 'N/A'}</p> <!-- Ensure this accesses the correct property -->
        <p>Date: ${run.timestamp ? new Date(run.timestamp).toLocaleString() : 'N/A'}</p>
        ${run.data ? `<button class="download-csv" data-csv="${encodeURIComponent(run.data)}" data-batch="${run.batchName || 'unknown'}">Download CSV</button>` : ''}
        <hr>
      `;
      previousRunsDiv.appendChild(runDiv);
    });

    // Add event listeners to all download buttons
    document.querySelectorAll('.download-csv').forEach(button => {
      button.addEventListener('click', function () {
        downloadCSV(this.dataset.csv, this.dataset.batch);
      });
    });
  }

  // Reset previous runs function
  window.resetPreviousRuns = function () {
    // Reset search input container
    const searchInputContainer = document.getElementById('searchInputContainer');
    if (searchInputContainer) {
      searchInputContainer.innerHTML = `
        <select id="assaySearch">
          <option value="">Select Assay</option>
          <option value="AMPoff">AMPoff</option>
          <option value="Antidepressants">Antidepressants</option>
          <option value="BTHC">BTHC</option>
          <option value="Creatinine">Creatinine</option>
          <option value="DLMeth">DL Meth</option>
          <option value="ETG">ETG</option>
          <option value="Gaba">Gaba</option>
          <option value="OralFluids">OralFluids</option>
          <option value="Pain2">Pain2</option>
          <option value="Pain3">Pain3</option>
          <option value="Synthetic">Synthetic</option>
          <option value="Testosterone">Testosterone</option>
          <option value="tfvDP">TFV-DP</option>
          <option value="vitD">VitD</option>
        </select>
      `;
    }

    // Clear previous runs display
    const previousRunsDiv = document.getElementById('previousRuns');
    if (previousRunsDiv) previousRunsDiv.innerHTML = ''; // Clear previous runs only

    // Reset the radio buttons
    const radioButtons = document.querySelectorAll('input[name="searchType"]');
    radioButtons.forEach(radio => {
      radio.checked = false; // Uncheck all radio buttons
    });
  };

  // Use DOMContentLoaded event to ensure the DOM is fully loaded before running our code
  document.addEventListener('DOMContentLoaded', initializeSearch);
})();

// Function to handle CSV download
function downloadCSV(csvData, batchName) {
  const decodedCsvData = decodeURIComponent(csvData);
  const blob = new Blob([decodedCsvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${batchName}.csv`; // Use batchName as the file name
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Expose the function to the global scope
window.downloadCSV = downloadCSV;

// Initialize the instruments mapping
const assayInstruments = {
  "AMPoff": AMPoff.defaultInstruments,
  "Antidepressants": Antidepressants.defaultInstruments,
  "BTHC": BTHC.defaultInstruments,
  "Creatinine": Creatinine.defaultInstruments,
  "DLMeth": DLMeth.defaultInstruments,
  "ETG": ETG.defaultInstruments,
  "Gaba": Gaba.defaultInstruments,
  "OralFluids": OralFluids.defaultInstruments,
  "Pain2": Pain2.defaultInstruments,
  "Pain3": Pain3.defaultInstruments,
  "Synthetic": Synthetic.defaultInstruments,
  "Testosterone": Testosterone.defaultInstruments,
  "tfvDP": tfvDP.defaultInstruments,
  "vitD": vitD.defaultInstruments
};

// Complete list of instruments
const allInstruments = [
  'LCMS 1', 'LCMS 2', 'LCMS 3', 'LCMS 4',
  'LCMS 5', 'LCMS 6', 'LCMS 7', 'LCMS 9',
  'LCMS 10', 'LCMS 15', 'LCMS 16', 'LCMS 17'
];

// Function to populate the available instruments dropdown
function populateAvailableInstrumentsDropdown() {
  const availableInstrumentsDropdown = document.getElementById('availableInstruments');

  // Clear existing options
  availableInstrumentsDropdown.innerHTML = '<option value="">Select an instrument</option>';

  // Populate with all instruments
  allInstruments.forEach(instrument => {
    const option = document.createElement('option');
    option.value = instrument;
    option.textContent = instrument;
    availableInstrumentsDropdown.appendChild(option);
  });
}


document.addEventListener('DOMContentLoaded', function () {
  // Load instruments from localStorage
  const savedInstruments = localStorage.getItem('assayInstruments');
  if (savedInstruments) {
    const parsedInstruments = JSON.parse(savedInstruments);
    // Merge saved instruments with the existing assayInstruments
    Object.keys(parsedInstruments).forEach(assay => {
      if (assayInstruments[assay]) {
        assayInstruments[assay] = [...new Set([...assayInstruments[assay], ...parsedInstruments[assay]])];
      }
    });
  }
  /*
async function fetchAssayInstruments() {
  try {
    const response = await fetch('https://jsonplaceholder.com/api/assayInstruments'); // Replace with actual endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Assuming the data is structured correctly for assayInstruments
  } catch (error) {
    console.error('Error fetching assay instruments:', error);
    return {}; // Return an empty object on error
  }
}
  document.addEventListener('DOMContentLoaded', async function () {
  // Load instruments from the server
  const fetchedInstruments = await fetchAssayInstruments();

  // Merge fetched instruments with the existing assayInstruments
  Object.keys(fetchedInstruments).forEach(assay => {
    if (assayInstruments[assay]) {
      assayInstruments[assay] = [...new Set([...assayInstruments[assay], ...fetchedInstruments[assay]])];
    } else {
      // If the assay does not exist in assayInstruments, add it
      assayInstruments[assay] = fetchedInstruments[assay];
    }
  });

  // Continue with initialization logic
  populateAvailableInstrumentsDropdown();
  updateLCMSDropdown();

  // Disable buttons initially
  document.getElementById('addInstrumentBtn').disabled = true;
  document.getElementById('removeInstrumentBtn').disabled = true;
  document.getElementById('toggleMeansBtn').disabled = true;
  document.getElementById('toggleISTDBtn').disabled = true;
  document.getElementById('finishedBtn').disabled = true;

  // ... (rest of initialization code
});
  */

  // Populate the available instruments dropdown for the update container
  populateAvailableInstrumentsDropdown();

  // Update the LCMS dropdown based on the selected assay in the analyze container
  updateLCMSDropdown();

  // Disable buttons initially
  document.getElementById('addInstrumentBtn').disabled = true;
  document.getElementById('removeInstrumentBtn').disabled = true;
  document.getElementById('toggleMeansBtn').disabled = true;
  document.getElementById('toggleISTDBtn').disabled = true;
  document.getElementById('finishedBtn').disabled = true;

  // Event listener for the assay dropdown
  document.getElementById('updateAssay').addEventListener('change', function () {
    const selectedAssay = this.value;

    // Enable buttons if a valid assay is selected
    const buttons = [
      'addInstrumentBtn',
      'removeInstrumentBtn',
      'toggleMeansBtn',
      'toggleISTDBtn',
      'finishedBtn'
    ];

    buttons.forEach(buttonId => {
      document.getElementById(buttonId).disabled = !selectedAssay; // Enable if selectedAssay is not empty
    });
  });

  const addInstrumentBtn = document.getElementById('addInstrumentBtn');
  if (addInstrumentBtn) {
    addInstrumentBtn.addEventListener('click', function () {
    });
  } else {
    console.error('Add Instrument button not found in the DOM.');
  }

  const removeInstrumentBtn = document.getElementById('removeInstrumentBtn');
  if (removeInstrumentBtn) {
    removeInstrumentBtn.addEventListener('click', function () {
    });
  } else {
    console.error('Remove Instrument button not found in the DOM.');
  }
});

// Function to update the LCMS dropdown based on the selected assay in the analyze container
function updateLCMSDropdown() {
  const selectedAssay = document.getElementById('assay').value;
  const lcmsDropdown = document.getElementById('lcms');

  // Enable the dropdown
  lcmsDropdown.disabled = false;

  // Clear existing options
  lcmsDropdown.innerHTML = '<option value="">Select an instrument</option>';

  // Get instruments for the selected assay
  const instruments = assayInstruments[selectedAssay] || [];
  instruments.forEach(instrument => {
    const option = document.createElement('option');
    option.value = instrument;
    option.textContent = instrument;
    lcmsDropdown.appendChild(option);
  });
}

// Event listener for the assay selection in the analyze container
document.getElementById('assay').addEventListener('change', function () {
  updateLCMSDropdown(); // Update the LCMS dropdown based on the selected assay
});

// Event listener for adding an instrument
document.getElementById('addInstrumentBtn').addEventListener('click', function () {
  const selectedAssay = document.getElementById('updateAssay').value;
  const selectedInstrument = document.getElementById('availableInstruments').value;

  if (selectedInstrument) {
    addInstrument(selectedAssay, selectedInstrument);
    updateCurrentInstruments(selectedAssay); // Refresh the current instruments list
    alert('Instrument has been added.'); // Alert for adding instrument
  } else {
    alert('Please select a valid instrument to add.');
  }
});

// Function to add an instrument
function addInstrument(assay, instrument) {
  if (!assayInstruments[assay].includes(instrument)) {
    assayInstruments[assay].push(instrument);
    localStorage.setItem('assayInstruments', JSON.stringify(assayInstruments));
  }
}
/*
async function saveInstrumentsToServer() {
  try {
    const response = await fetch('https://jsonplaceholder.com/api/assayInstruments', { // Replace with actual endpoint
      method: 'PUT', // or post  if creating new data?
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assayInstruments), // Send the updated assayInstruments object
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log("Instruments saved successfully.");
  } catch (error) {
    console.error('Error saving instruments to server:', error);
  }
}
*/
/*
function addInstrument(assay, instrument) {
  if (!assayInstruments[assay].includes(instrument)) {
    assayInstruments[assay].push(instrument);
    // Save the updated instruments to the server
    saveInstrumentsToServer(); // Call the function to save to the server
  }
}
*/

// Function to remove an instrument
function removeInstrument(assay, instrument) {
  const index = assayInstruments[assay].indexOf(instrument);
  if (index > -1) {
    assayInstruments[assay].splice(index, 1); // Remove the instrument
    localStorage.setItem('assayInstruments', JSON.stringify(assayInstruments)); // Update localStorage
  }
}
/*
//Also uses saveInstrumentsToServer to remove an instrument
function removeInstrument(assay, instrument) {
  const index = assayInstruments[assay].indexOf(instrument);
  if (index > -1) {
    assayInstruments[assay].splice(index, 1); // Remove the instrument
    // Save the updated instruments to the server
    saveInstrumentsToServer(); // Call the function to save to the server
  }
}
*/


// Event listener for removing an instrument
document.getElementById('removeInstrumentBtn').addEventListener('click', function () {
  const selectedAssay = document.getElementById('updateAssay').value;
  const selectedInstrument = document.getElementById('availableInstruments').value;

  if (selectedInstrument) {
    removeInstrument(selectedAssay, selectedInstrument);
    updateCurrentInstruments(selectedAssay); // Refresh the current instruments list
    updateLCMSDropdown(); // Update the LCMS dropdown in the analyze container
    alert('Instrument has been removed.'); // Alert for removing instrument
  } else {
    alert('Please select a valid instrument to remove.');
  }
});

// Function to update the current instruments list
function updateCurrentInstruments(selectedAssay) {
  const currentInstrumentsList = document.getElementById('currentInstrumentsList');
  const selectedAssayValue = selectedAssay || document.getElementById('updateAssay').value;

  // Clear current instruments list
  currentInstrumentsList.innerHTML = '';

  // Get instruments for the selected assay
  const instruments = assayInstruments[selectedAssayValue] || [];
  instruments.forEach(instrument => {
    const li = document.createElement('li');
    li.textContent = instrument;
    currentInstrumentsList.appendChild(li);
  });
}

// Event listener for assay selection in the update container
document.getElementById('updateAssay').addEventListener('change', function () {
  const selectedAssay = this.value;
  updateCurrentInstruments(selectedAssay); // Update the current instruments list
});

// UI Logic

function displayEstablishedMeans() {
  const container = document.getElementById('establishedMeansContainer');
  container.innerHTML = ''; // Clear the container

  const updateAssayParent = document.getElementById("updateAssay").value;

  // Display existing analytes
  for (const analyte in establishedMeans[updateAssayParent]) {
    if (establishedMeans[updateAssayParent].hasOwnProperty(analyte)) {
      const { peakArea, retentionTime } = establishedMeans[updateAssayParent][analyte];
      const analyteDiv = document.createElement('div');
      analyteDiv.classList.add('established-means-item');
      analyteDiv.innerHTML = `
        <span class="analyte-name">${analyte}:</span>
        <div class="input-group">
          <label for="peakArea_${analyte}">Peak Area:</label>
          <input type="number" id="peakArea_${analyte}" value="${peakArea}">
        </div>
        <div class="input-group">
          <label for="retentionTimeMin_${analyte}">RT Min:</label>
          <input type="number" id="retentionTimeMin_${analyte}" value="${retentionTime.min}">
        </div>
        <div class="input-group">
          <label for="retentionTimeMax_${analyte}">RT Max:</label>
          <input type="number" id="retentionTimeMax_${analyte}" value="${retentionTime.max}">
        </div>
      `;
      container.appendChild(analyteDiv);
    }
  }

  // Add the "Save Changes" button below the existing analytes
  const saveButton = document.createElement('button');
  saveButton.id = 'saveMeansBtn';
  saveButton.textContent = 'Save Changes to Means';
  container.appendChild(saveButton);

  // Input fields for adding a new analyte
  const newAnalyteDiv = document.createElement('div');
  newAnalyteDiv.innerHTML = `
    <input type="text" id="newAnalyteName" placeholder="New Parent Analyte Name" />
    <input type="number" id="newPeakArea" placeholder="Peak Area" />
    <input type="number" id="newRTMin" placeholder="RT Min" />
    <input type="number" id="newRTMax" placeholder="RT Max" />
  `;
  container.appendChild(newAnalyteDiv);

  // Add the "Add Analyte" button
  const addButton = document.createElement('button');
  addButton.id = 'addAnalyteBtn';
  addButton.textContent = 'Add Analyte';
  container.appendChild(addButton);

  // Add the "Remove Analyte" button
  const removeButton = document.createElement('button');
  removeButton.id = 'removeAnalyteBtn';
  removeButton.textContent = 'Remove Analyte';
  container.appendChild(removeButton);

  // Add the "Hide Parent Analyte Means" button
  const hideButton = document.createElement('button');
  hideButton.id = 'hideMeansBtnBottom';
  hideButton.textContent = 'Hide Parent Analyte Means';
  container.appendChild(hideButton);

  // Attach event listeners
  saveButton.addEventListener('click', () => saveEstablishedMeans(updateAssayParent));
  hideButton.addEventListener('click', toggleEstablishedMeans);

  // Add analyte event listener
  addButton.addEventListener('click', () => {
    const newAnalyteName = document.getElementById('newAnalyteName').value.trim();
    const newPeakArea = parseFloat(document.getElementById('newPeakArea').value);
    const newRTMin = parseFloat(document.getElementById('newRTMin').value);
    const newRTMax = parseFloat(document.getElementById('newRTMax').value);

    if (newAnalyteName && !isNaN(newPeakArea) && !isNaN(newRTMin) && !isNaN(newRTMax)) {
      // Add the new analyte to establishedMeans
      establishedMeans[updateAssayParent][newAnalyteName] = {
        peakArea: newPeakArea,
        retentionTime: {
          min: newRTMin,
          max: newRTMax
        }
      };
      displayEstablishedMeans(); // Refresh the display
    } else {
      alert('Please fill in all fields: Analyte Name, Peak Area, RT min, and RT max.');
    }
  });

  // Remove analyte event listener
  removeButton.addEventListener('click', () => {
    const analyteToRemove = prompt('Enter the name of the analyte to remove:');
    if (analyteToRemove && establishedMeans[updateAssayParent][analyteToRemove]) {
      delete establishedMeans[updateAssayParent][analyteToRemove];
      displayEstablishedMeans(); // Refresh the display
    } else {
      alert('Analyte not found or invalid name.');
    }
  });
}

function displayIstdAnalytes() {
  const container = document.getElementById('istdContainer');
  container.innerHTML = ''; // Clear the container
  const updateAssayIstd = document.getElementById("updateAssay").value;

  // Display existing ISTD analytes
  for (const analyte in istdAnalytes[updateAssayIstd]) {
    if (istdAnalytes[updateAssayIstd].hasOwnProperty(analyte)) {
      const { peakArea, retentionTime } = istdAnalytes[updateAssayIstd][analyte];
      const analyteDiv = document.createElement('div');
      analyteDiv.classList.add('istd-analyte-item');
      analyteDiv.innerHTML = `
        <span class="analyte-name">${analyte}:</span>
        <div class="input-group">
          <label for="istdPeakArea_${analyte}">Peak Area:</label>
          <input type="number" id="istdPeakArea_${analyte}" value="${peakArea}">
        </div>
        <div class="input-group">
          <label for="istdRetentionTimeMin_${analyte}">RT Min:</label>
          <input type="number" id="istdRetentionTimeMin_${analyte}" value="${retentionTime.min}">
        </div>
        <div class="input-group">
          <label for="istdRetentionTimeMax_${analyte}">RT Max:</label>
          <input type="number" id="istdRetentionTimeMax_${analyte}" value="${retentionTime.max}">
        </div>
      `;
      container.appendChild(analyteDiv);
    }
  }

  // Add the "Save Changes" button below the existing analytes
  const saveButton = document.createElement('button');
  saveButton.id = 'saveISTDBtn';
  saveButton.textContent = 'Save Changes to Means';
  container.appendChild(saveButton);

  // Input fields for adding a new ISTD analyte
  const newIstdAnalyteDiv = document.createElement('div');
  newIstdAnalyteDiv.innerHTML = `
    <input type="text" id="newIstdAnalyteName" placeholder="New ISTD Analyte Name" />
    <input type="number" id="newIstdPeakArea" placeholder="Peak Area" />
    <input type="number" id="newIstdRTMin" placeholder="RT Min" />
    <input type="number" id="newIstdRTMax" placeholder="RT Max" />
  `;
  container.appendChild(newIstdAnalyteDiv);

  // Add the "Add ISTD Analyte" button
  const addButton = document.createElement('button');
  addButton.id = 'addISTDAnalyteBtn';
  addButton.textContent = 'Add ISTD Analyte';
  container.appendChild(addButton);

  // Add the "Remove ISTD Analyte" button
  const removeButton = document.createElement('button');
  removeButton.id = 'removeISTDAnalyteBtn';
  removeButton.textContent = 'Remove ISTD Analyte';
  container.appendChild(removeButton);

  // Add the "Hide ISTD Means" button
  const hideButton = document.createElement('button');
  hideButton.id = 'hideISTDBtnBottom';
  hideButton.textContent = 'Hide ISTD Means';
  container.appendChild(hideButton);

  // Attach event listeners
  saveButton.addEventListener('click', () => saveISTDAnalytes(updateAssayIstd));
  hideButton.addEventListener('click', toggleIstdMeans);

  // Add ISTD analyte event listener
  addButton.addEventListener('click', () => {
    const newIstdAnalyteName = document.getElementById('newIstdAnalyteName').value.trim();
    const newIstdPeakArea = parseFloat(document.getElementById('newIstdPeakArea').value);
    const newIstdRTMin = parseFloat(document.getElementById('newIstdRTMin').value);
    const newIstdRTMax = parseFloat(document.getElementById('newIstdRTMax').value);

    if (newIstdAnalyteName && !isNaN(newIstdPeakArea) && !isNaN(newIstdRTMin) && !isNaN(newIstdRTMax)) {
      // Add the new ISTD analyte to istdAnalytes
      istdAnalytes[updateAssayIstd][newIstdAnalyteName] = {
        peakArea: newIstdPeakArea,
        retentionTime: {
          min: newIstdRTMin,
          max: newIstdRTMax
        }
      };
      displayIstdAnalytes(); // Refresh the display
    } else {
      alert('Please fill in all fields: Analyte Name, Peak Area, RT min, and RT max.');
    }
  });

  // Remove ISTD analyte event listener
  removeButton.addEventListener('click', () => {
    const analyteToRemove = prompt('Enter the name of the ISTD analyte to remove:');
    if (analyteToRemove && istdAnalytes[updateAssayIstd][analyteToRemove]) {
      delete istdAnalytes[updateAssayIstd][analyteToRemove];
      displayIstdAnalytes(); // Refresh the display
    } else {
      alert('ISTD Analyte not found or invalid name.');
    }
  });
}

// Toggle ISTD Means Function
function toggleIstdMeans() {
  const container = document.getElementById('istdContainer');
  const toggleButton = document.getElementById('toggleISTDBtn');

  if (container.classList.contains('collapsed')) {
    container.classList.remove('collapsed');
    displayIstdAnalytes();
    toggleButton.textContent = 'Hide ISTD Means';
  } else {
    container.classList.add('collapsed');
    container.innerHTML = '';
    toggleButton.textContent = 'Show ISTD Means';
  }
}

// Toggle Established Means Function
function toggleEstablishedMeans() {
  const container = document.getElementById('establishedMeansContainer');
  const toggleButton = document.getElementById('toggleMeansBtn');

  if (container.classList.contains('collapsed')) {
    container.classList.remove('collapsed');
    displayEstablishedMeans();
    toggleButton.textContent = 'Hide Parent Analyte Means';
  } else {
    container.classList.add('collapsed');
    container.innerHTML = '';
    toggleButton.textContent = 'Show Parent Analyte Means';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const meansContainer = document.getElementById('establishedMeansContainer');
  const toggleMeansButton = document.getElementById('toggleMeansBtn');
  const istDContainer = document.getElementById('istdContainer');
  const toggleISTDButton = document.getElementById('toggleISTDBtn');
  const lcmsDropdown = document.getElementById("lcms");

  // Function to hide the means containers
  function hideMeansContainers() {
    meansContainer.classList.add('collapsed');
    toggleMeansButton.disabled = true;
    istDContainer.classList.add('collapsed');
    toggleISTDButton.disabled = true;
  }

  // Disable LCMS dropdown and means buttons initially
  lcmsDropdown.disabled = true;
  hideMeansContainers();

  // At the top of file there is a defined array of supported assays
  const supportedAssays = Object.keys(assayData);

  document.getElementById("updateAssay").addEventListener("change", function () {
    const selectedAssay = this.value;

    if (supportedAssays.includes(selectedAssay)) {
      lcmsDropdown.disabled = false;
      toggleMeansButton.disabled = false;
      toggleISTDButton.disabled = false;
      // Populate the means only if they are visible
      if (!meansContainer.classList.contains('collapsed')) {
        displayEstablishedMeans();
      }
      if (!istDContainer.classList.contains('collapsed')) {
        displayIstdMeans();
      }
    } else {
      lcmsDropdown.disabled = true;
      hideMeansContainers();
    }
  });

  // Add event listeners to show/hide means buttons
  if (toggleMeansButton) {
    toggleMeansButton.addEventListener('click', toggleEstablishedMeans);
  }

  if (toggleISTDButton) {
    toggleISTDButton.addEventListener('click', toggleIstdMeans);
  }

  // Add event listeners for other buttons
  document.getElementById('searchBtn').addEventListener('click', searchRuns);
  document.getElementById('analyzeBtn').addEventListener('click', analyzeData);
  document.getElementById('resetMainFormBtn').addEventListener('click', resetMainForm);
  document.getElementById('resetPreviousRunsBtn').addEventListener('click', resetPreviousRuns);

});


function resetMainForm() {
  // Reset assay selection
  const assaySelect = document.getElementById('assay');
  if (assaySelect) assaySelect.value = '';

  // Reset LCMS instrument selection
  const lcmsSelect = document.getElementById('lcms');
  if (lcmsSelect) {
    lcmsSelect.value = '';
    lcmsSelect.disabled = true;
  }

  // Clear file input
  const fileUpload = document.getElementById('fileUpload');
  if (fileUpload) fileUpload.value = '';

  // Clear displayed results
  const resultsDisplay = document.getElementById('resultsDisplay');
  if (resultsDisplay) resultsDisplay.innerHTML = ''; // Clear results
}

document.getElementById('resetMainFormBtn').addEventListener('click', resetMainForm);


document.addEventListener('DOMContentLoaded', function () {
  const updateContainer = document.querySelector('.update-container');
  const updateContent = document.querySelector('.updateContent');

  // Initially hide the update content
  updateContent.style.display = 'none';

  // Add click event listener to the update container to show the content
  updateContainer.addEventListener('click', function () {
    updateContent.style.display = 'block'; // Show content
  });

  // Prevent click events on child elements from closing the content
  const childElements = updateContent.querySelectorAll('select, button, input'); // Add any other interactive elements as needed
  childElements.forEach(element => {
    element.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent the click from bubbling up to the updateContainer
    });
  });

  // Add event listener for the Finished button
  const finishedBtn = document.getElementById('finishedBtn');
  if (finishedBtn) {
    finishedBtn.addEventListener('click', function () {
      const confirmed = confirm('Update Completed.');
      if (confirmed) {
        // Hide only the update content after confirmation
        updateContent.style.display = 'none'; // Hide the content, keeping the headers visible
      }
    });
  }
});

// Function to clear the update instruments
function clearUpdateInstruments() {
  // Clear the selected assay
  document.getElementById('updateAssay').value = '';

  // Clear the selected instrument
  document.getElementById('availableInstruments').value = '';

  // Clear the current instruments list
  const currentInstrumentsList = document.getElementById('currentInstrumentsList');
  currentInstrumentsList.innerHTML = ''; // Clear the list
}

document.getElementById('finishedBtn').addEventListener('click', function () {
  clearUpdateInstruments(); // Call the function to clear the fields
});

function addParentAnalyte() {
  const container = document.getElementById('parentAnalytesContainer');
  const analyteDiv = document.createElement('div');
  analyteDiv.innerHTML = `
    <input type="text" placeholder="Analyte Name" required>
    <input type="number" placeholder="Peak Area" required>
    <input type="number" placeholder="RT Min" required>
    <input type="number" placeholder="RT Max" required>
    <button class="removeAnalyteBtn">Remove</button>
  `;
  container.appendChild(analyteDiv);

  // Attach event listener to remove the analyte
  analyteDiv.querySelector('.removeAnalyteBtn').addEventListener('click', () => {
    container.removeChild(analyteDiv);
  });
}

function addIstdAnalyte() {
  const container = document.getElementById('istdAnalytesContainer');
  const analyteDiv = document.createElement('div');
  analyteDiv.innerHTML = `
    <input type="text" placeholder="ISTD Analyte Name" required>
    <input type="number" placeholder="Peak Area" required>
    <input type="number" placeholder="RT Min" required>
    <input type="number" placeholder="RT Max" required>
    <button class="removeIstdBtn">Remove</button>
  `;
  container.appendChild(analyteDiv);

  // Attach event listener to remove the ISTD analyte
  analyteDiv.querySelector('.removeIstdBtn').addEventListener('click', () => {
    container.removeChild(analyteDiv);
  });
}

function saveNewAssay() {
  const assayName = document.getElementById('assayName').value.trim();
  const parentAnalytes = Array.from(document.querySelectorAll('#parentAnalytesContainer > div')).map(div => {
    const inputs = div.querySelectorAll('input');
    return {
      name: inputs[0].value.trim(),
      peakArea: parseFloat(inputs[1].value),
      rtMin: parseFloat(inputs[2].value),
      rtMax: parseFloat(inputs[3].value)
    };
  });

  const istdAnalytes = Array.from(document.querySelectorAll('#istdAnalytesContainer > div')).map(div => {
    const inputs = div.querySelectorAll('input');
    return {
      name: inputs[0].value.trim(),
      peakArea: parseFloat(inputs[1].value),
      rtMin: parseFloat(inputs[2].value),
      rtMax: parseFloat(inputs[3].value)
    };
  });

  const selectedInstruments = Array.from(document.getElementById('instrumentsSelect').selectedOptions).map(option => option.value);

  // Create the new assay object
  const newAssay = {
    name: assayName,
    parentAnalytes: parentAnalytes,
    istdAnalytes: istdAnalytes,
    instruments: selectedInstruments
  };

  // Save to local storage
  const existingAssays = JSON.parse(localStorage.getItem('assays')) || [];
  existingAssays.push(newAssay);
  localStorage.setItem('assays', JSON.stringify(existingAssays));

  // Optionally, refresh the UI or clear the form
  alert('New assay saved successfully!');
  document.getElementById('newAssayFormContainer').style.display = 'none'; // Hide the form
}

document.getElementById('addNewAssayBtn').addEventListener('click', function () {
  const formContainer = document.getElementById('newAssayFormContainer');
  formContainer.innerHTML = ''; // Clear previous form if any

  // Create the form elements
  const formHTML = `
    <h3>Add New Assay</h3>
    <label for="assayName">Assay Name:</label>
    <input type="text" id="assayName" required>
    
    <h4>Parent Analytes</h4>
    <div id="parentAnalytesContainer"></div>
    <button id="addParentAnalyteBtn">Add Parent Analyte</button>
    
    <h4>ISTD Analytes</h4>
    <div id="istdAnalytesContainer"></div>
    <button id="addIstdAnalyteBtn">Add ISTD Analyte</button>
    
    <h4>Select Instruments</h4>
    <select id="instrumentsSelect" multiple>
      ${Object.keys(assayInstruments).map(instrument => `<option value="${instrument}">${instrument}</option>`).join('')}
    </select>
    
    <button id="saveNewAssayBtn">Save New Assay</button>
  `;
  
  formContainer.innerHTML = formHTML;
  formContainer.style.display = 'block'; // Show the form

  // Attach event listeners for adding analytes
  document.getElementById('addParentAnalyteBtn').addEventListener('click', addParentAnalyte);
  document.getElementById('addIstdAnalyteBtn').addEventListener('click', addIstdAnalyte);
  
  // Attach event listener for saving the new assay
  document.getElementById('saveNewAssayBtn').addEventListener('click', saveNewAssay);
});
