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

// Load instruments from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
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

  // Populate the available instruments dropdown for the update container
  populateAvailableInstrumentsDropdown();

  // Update the LCMS dropdown based on the selected assay in the analyze container
  updateLCMSDropdown();
});

// Function to populate the available instruments dropdown
function populateAvailableInstrumentsDropdown() {
  const availableInstrumentsDropdown = document.getElementById('availableInstruments');

  // Clear existing options
  availableInstrumentsDropdown.innerHTML = '<option value="">Select an instrument</option>';

  // Populate with all instruments from the assayInstruments object
  Object.keys(assayInstruments).forEach(assay => {
    assayInstruments[assay].forEach(instrument => {
      const option = document.createElement('option');
      option.value = instrument;
      option.textContent = instrument;
      availableInstrumentsDropdown.appendChild(option);
    });
  });
}

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
  } else {
    alert('Please select a valid instrument.');
  }
});

// Function to add an instrument
function addInstrument(assay, instrument) {
  if (!assayInstruments[assay].includes(instrument)) {
    assayInstruments[assay].push(instrument);
    localStorage.setItem('assayInstruments', JSON.stringify(assayInstruments));
  }
}

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

let establishedMeans = {};
let istdAnalytes = {};

// Initialize data for all assays
for (const assay in assayData) {
  establishedMeans[assay] = JSON.parse(localStorage.getItem(`${assay}EstablishedMeans`)) || { ...assayData[assay].defaultEstablishedMeans };
  istdAnalytes[assay] = JSON.parse(localStorage.getItem(`${assay}IstdAnalytes`)) || { ...assayData[assay].defaultIstdAnalytes };
}

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
  localStorage.setItem(`${assay}IstdAnalytes`, JSON.stringify(istdAnalytes[assay]));
  console.log(`Updated ISTD Analytes for ${assay}:`, istdAnalytes[assay]);
  alert(`ISTD analytes for ${assay} have been saved successfully!`);
}

let currentAssay = '';

document.getElementById("assay").addEventListener("change", function () {
  currentAssay = this.value;
  console.log("Selected assay:", currentAssay);
  console.log("Assay data:", assayData[currentAssay]);

  const lcmsDropdown = document.getElementById("lcms");
  const toggleMeansButton = document.getElementById("toggleMeansBtn");
  const toggleISTDButton = document.getElementById("toggleISTDBtn");

  lcmsDropdown.innerHTML = '<option value="">Select an instrument</option>';
  lcmsDropdown.disabled = true;
  toggleMeansButton.disabled = true;
  toggleISTDButton.disabled = true;

  if (assayInstruments[currentAssay]) { // Use assayInstruments instead of assayData
    console.log("Instruments for selected assay:", assayInstruments[currentAssay]);
    assayInstruments[currentAssay].forEach(instrument => {
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
  const fileInput = document.getElementById('fileUpload');
  if (!fileInput.files.length) {
    alert('Please upload a CSV file before analyzing data.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const csvData = event.target.result;
    const rows = csvData.split('\n').slice(1); // Skip header row
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
      if (row.trim() === '') return;

      const columns = row.split(',').map(item => item.trim());
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

    displayResults(results, passCount, failCount);
    saveRun(document.getElementById('lcms').value, document.getElementById('assay').value, batchName, passCount >= Object.keys(assayData[currentAssay].defaultEstablishedMeans).length / 2 ? 'PASS' : 'FAIL', csvData);
  };

  reader.onerror = function (error) {
    console.error('Error reading file:', error);
  };

  reader.readAsText(fileInput.files[0]);
}

function displayResults(results, passCount, failCount) {
  const resultsDisplay = document.getElementById('resultsDisplay'); // Get the results display div
  if (!resultsDisplay) {
    console.error("Results display div not found!");
    return;
  }

  resultsDisplay.innerHTML = ''; // Clear previous results

  const totalAnalytes = passCount + failCount;
  const runResult = passCount >= totalAnalytes / 2 ? 'PASS' : 'FAIL';

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
    result: result,
    data: csvData,
    timestamp: Date.now()
  };
  console.log("Saving run:", newRun);
  previousRuns.push(newRun);
  localStorage.setItem('previousRuns', JSON.stringify(previousRuns));
}

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
        <p>Result: ${run.result || 'N/A'}</p>
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

  // Reset form function
  window.resetMainForm = function () {
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
  };

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

// UI Logic

function displayEstablishedMeans() {
  const container = document.getElementById('establishedMeansContainer');
  container.innerHTML = '';

  for (const analyte in establishedMeans[currentAssay]) {
    if (establishedMeans[currentAssay].hasOwnProperty(analyte)) {
      const { peakArea, retentionTime } = establishedMeans[currentAssay][analyte];
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

  // Add a container for buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  // Add the "Save Changes" button
  const saveButton = document.createElement('button');
  saveButton.id = 'saveMeansBtn';
  saveButton.textContent = 'Save Changes';
  buttonContainer.appendChild(saveButton);

  // Add the "Hide Parent Analyte Means" button
  const hideButton = document.createElement('button');
  hideButton.id = 'hideMeansBtnBottom';
  hideButton.textContent = 'Hide Parent Analyte Means';
  buttonContainer.appendChild(hideButton);

  container.appendChild(buttonContainer);

  // Attach event listeners
  saveButton.addEventListener('click', () => saveEstablishedMeans(currentAssay));
  hideButton.addEventListener('click', toggleEstablishedMeans);
}

function displayIstdAnalytes() {
  const container = document.getElementById('istdContainer');
  container.innerHTML = '';

  console.log('ISTD Analytes for current assay before display:', istdAnalytes[currentAssay]); // Log the analytes

  for (const analyte in istdAnalytes[currentAssay]) {
    if (istdAnalytes[currentAssay].hasOwnProperty(analyte)) {
      const { peakArea, retentionTime } = istdAnalytes[currentAssay][analyte];
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

  // Add a container for buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  // Add the "Save Changes" button
  const saveButton = document.createElement('button');
  saveButton.id = 'saveISTDBtn';
  saveButton.textContent = 'Save Changes';
  buttonContainer.appendChild(saveButton);

  // Add the "Hide ISTD Analytes" button
  const hideButton = document.createElement('button');
  hideButton.id = 'hideISTDBtnBottom';
  hideButton.textContent = 'Hide ISTD Analytes';
  buttonContainer.appendChild(hideButton);

  container.appendChild(buttonContainer);

  // Attach event listeners
  saveButton.addEventListener('click', () => saveISTDAnalytes(currentAssay));
  hideButton.addEventListener('click', toggleISTDAnalytes);
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
// Function to toggle ISTD analytes display
function toggleISTDAnalytes() {
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

  // At the top of your file, define an array of supported assays
  const supportedAssays = Object.keys(assayData);

  // Then in your event listener
  document.getElementById("assay").addEventListener("change", function () {
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
        displayIstdAnalytes();
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
    toggleISTDButton.addEventListener('click', toggleISTDAnalytes);
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

function resetPreviousRuns() {
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
}
