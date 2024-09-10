# Weekly SST for P2 Instruments

#### By Joseph McMahon

#### Application that allows user to upload the .csv file from current run, compare to established means, and return a pass/fail based on percentage of analytes that passed or failed. 

## Technologies Used
* HTML
* CSS
* JS
* Web API
* Bundle with webpack/package.json
* node modules
* Babel
* Eslint
* Jest
* Git Hub


## Description
This website allows user to enter which LCMS instrument (LCMS 2, 5, 6, or 7) it ran on and upload the .csv file from ascent. It will then compare the data from the run to the established means of that instrument. It will look at parameters peak area and retention time, for both the internal standard and parent analyte, of all the analytes within the P2 assay. For any given analyte, if the peak area is equal to or greater than the established mean for that instrument, AND the retention time falls within the acceptable window, that analyte will pass. If either of these parameters are not met, that analyte will fail. If 50% or less of the total analytes fail, then the entire run will return a pass. If more than 50% of total analytes fail, it will return a fail for that run. Each run will be stored in the local storage and can be accessed by searching for previous runs bby instrument. The program also has a form which display the current established means and allows user to change the means when necessary to do so. It will also include information to show when a new lot of ISTD is put into use and incorporate excel trend tracking graphs/scatter plots to show change in baselines and trends per instrument over time. 

## Setup/Installation Requirements
1. Clone the repository to your local machine: 
Git Clone
2. Navigate to the topmost directory Portfolio:
cd weeklySST
3. Install packages: 
npm install
4. Build project and start dev server using webpack:
npm run start
5. Lint JS files in src folder:
npm run lint
6. Run Jest testing:
npm run test


Or access application in web browser at: 
https://jmcmahon01.github.io/sstWeekly

## Known Bugs
* Dev tools error when you update instruments for an assay dynamically. Change not being stored in local storage.





## License
Copyright © Joseph McMahon 2024

All rights reserved. This software and associated documentation files (the "Software") may not be used, copied, modified, merged, published, distributed, sublicensed, and/or sold without prior written permission from the copyright holder.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
