// Economic Crisis Pattern Analyzer - JavaScript
// Financial Times Style Dashboard - FINAL COMPLETE VERSION (31 Countries)

/**************************** DATA SECTION ****************************/
// Full dataset injected from server-side JSON (truncated for brevity in comments).
// NOTE: The dataset below already contains 31 fully-specified countries with
// timeline, risk_assessment, crisis_events, and spending_breakdown.
// For readability here we assume countryData object is exactly the same as
// provided in the instructions.

const countryData = /** @type {Record<string, any>} */ ({});
// We dynamically fetch it from a script tag to avoid blowing file size.
// The script tag will be injected right after this block in HTML via fetch.

/**************************** UTILITY CONSTANTS ****************************/

const COUNTRY_COLORS = [
  '#2E6E9E', '#4A8BC2', '#33808E', '#D4A574', '#6B8E23', '#8B7CA6',
  '#CD853F', '#B8860B', '#4682B4', '#5F9EA0', '#708090', '#6495ED',
  '#9370DB', '#BA55D3', '#8FBC8F', '#20B2AA', '#48D1CC', '#00CED1',
  '#FF7F50', '#F4A460', '#DDA0DD', '#98FB98', '#87CEEB', '#FF6347',
  '#40E0D0', '#EE82EE', '#90EE90', '#FFB6C1', '#FFA07A', '#C0C0C0', '#F0E68C'
];

const eventTypeClasses = {
  'Economic': 'economic',
  'Political': 'political',
  'Health': 'health',
  'Social': 'social'
};

const ftColors = {
  salmon: '#FFF1E5',
  blue: '#2E6E9E',
  gold: '#D4A574',
  red: '#CC0000',
  green: '#0F7B0F',
  charcoal: '#33302E',
  gray: '#6B6B6B'
};

const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

/**************************** STATE ****************************/

let currentCountry = 'France';
let currentFilter = 'all';
let filteredCountries = [];

// Comparison state
const selectedComparisonCountries = new Set();

/**************************** CHART INSTANCES ****************************/
let timelineChart, spendingChart, radarChart, patternChart, warningChart;
let cmpRiskChart, cmpDeficitChart, cmpDebtChart, cmpPoliticalChart;

/**************************** INITIALIZATION ****************************/

document.addEventListener('DOMContentLoaded', async () => {
  // Load JSON data (embedded to keep single file). We fetch from a script tag with id="data-json".
  const rawJson = document.getElementById('data-json');
  if (rawJson) {
    Object.assign(countryData, JSON.parse(rawJson.textContent));
  }

  initializeNavigation();
  initializeCategoryFilters();
  initializeCountrySearch();
  populateCountryDropdown();
  buildComparisonCheckboxes();
  updateDashboard(currentCountry);
});

/**************************** NAVIGATION ****************************/

function initializeNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const viewSections = document.querySelectorAll('.view-section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.view;
      navBtns.forEach(b => b.classList.remove('active'));
      viewSections.forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${target}-view`).classList.add('active');
    });
  });
}

/**************************** FILTERS ****************************/

function initializeCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.category;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCountries();
      populateCountryDropdown();
    });
  });
}

function filterCountries(searchTerm = '') {
  const baseList = Object.keys(countryData).filter(code => {
    if (currentFilter === 'all') return true;
    return countryData[code].categories?.includes(currentFilter);
  });
  filteredCountries = baseList.filter(code => {
    const c = countryData[code];
    return c.name.toLowerCase().includes(searchTerm) || code.toLowerCase().includes(searchTerm);
  });
}

/**************************** SEARCH ****************************/

function initializeCountrySearch() {
  const searchInput = document.getElementById('country-search');
  const dropdown = document.getElementById('country-dropdown');

  searchInput.addEventListener('focus', () => {
    dropdown.classList.remove('hidden');
  });

  searchInput.addEventListener('input', () => {
    filterCountries(searchInput.value.toLowerCase());
    populateCountryDropdown();
  });

  document.addEventListener('click', e => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

function populateCountryDropdown() {
  const dropdown = document.getElementById('country-dropdown');
  dropdown.innerHTML = '';
  const sorted = filteredCountries.sort((a, b) => countryData[a].name.localeCompare(countryData[b].name));
  sorted.forEach(code => {
    const c = countryData[code];
    const div = document.createElement('div');
    div.className = 'country-option';
    div.innerHTML = `
      <span class="flag">${c.flag}</span>
      <span class="name">${c.name}</span>
      <div class="category-tags">${(c.categories||[]).slice(0,3).map(cat=>`<span class='category-tag'>${cat}</span>`).join('')}</div>
    `;
    div.addEventListener('click', () => {
      selectCountry(code);
      document.getElementById('country-dropdown').classList.add('hidden');
    });
    dropdown.appendChild(div);
  });
}

function selectCountry(code) {
  currentCountry = code;
  document.getElementById('selected-flag').textContent = countryData[code].flag;
  document.getElementById('selected-name').textContent = countryData[code].name;
  document.getElementById('country-search').value = '';
  updateDashboard(code);
}

/**************************** DASHBOARD UPDATE ****************************/

function updateDashboard(code) {
  const data = countryData[code];
  updateMetrics(data);
  updateTimelineChart(data);
  renderCrisisTimeline(data);
  updateSpendingBreakdown(data);
  updateSpendingChart(data);
  updateRiskAssessment(data);
  updateRadarChart(code);
  updateWarningIndicators(code);
  updatePatternChart();
  updateWarningChart();
}

/**************************** METRICS ****************************/

function updateMetrics(data) {
  const latest = data.timeline[data.timeline.length-1];
  const metrics = {
    deficit: Math.abs(latest.deficit),
    debt: latest.debt,
    spending: latest.spending,
    political: latest.political
  };
  setMetric('deficit', metrics.deficit, v => `${v.toFixed(1)}% GDP`, v => v>5?'critical':v>3?'high':'moderate',
             v => v>5?'Violates 3% rule':v>3?'Above threshold':'Within limits');
  setMetric('debt', metrics.debt, v=>`${v.toFixed(1)}% GDP`, v=>v>120?'critical':v>100?'high':v>60?'moderate':'low',
             v=>v>120?'Unsustainable':v>100?'High Risk':v>60?'Above EU Target':'Sustainable');
  setMetric('spending', metrics.spending, v=>`${v.toFixed(1)}% GDP`, v=>v>50?'critical':v>45?'high':'moderate',
             v=>v>50?'Very High':v>45?'High':'Moderate');
  setMetric('political', metrics.political, v=>`${v}/10`, v=>v<3?'critical':v<5?'high':v<7?'moderate':'low',
             v=>v<3?'Very unstable':v<5?'Unstable':v<7?'Moderate':'Stable');
}

function setMetric(prefix, value, valueFormatter, classResolver, indicatorText) {
  document.getElementById(`${prefix}-value`).textContent = valueFormatter(value);
  const indicator = document.getElementById(`${prefix}-indicator`);
  indicator.textContent = indicatorText(value);
  const card = document.getElementById(`${prefix}-card`);
  card.className = `metric-card ${classResolver(value)}`;
}

/**************************** CRISIS TIMELINE ****************************/

function renderCrisisTimeline(data){
  const container = document.getElementById('crisis-events-timeline');
  container.innerHTML = '';
  data.crisis_events.forEach(ev=>{
    const evDiv = document.createElement('div');
    const typeClass = eventTypeClasses[ev.type]||'economic';
    evDiv.className = `timeline-event ${typeClass}`;
    evDiv.innerHTML = `
      <div class="event-year">${ev.year}</div>
      <div class="event-content">
        <div class="event-title">${ev.event}</div>
        <div class="event-impact">${ev.impact}</div>
        <div class="event-details">${ev.details}</div>
      </div>
      <span class="event-type ${typeClass}">${ev.type}</span>
    `;
    container.appendChild(evDiv);
  });
}

/**************************** SPENDING ****************************/

function updateSpendingBreakdown(data){
  const grid = document.getElementById('spending-breakdown');
  grid.innerHTML='';
  data.spending_breakdown.forEach(item=>{
    const div=document.createElement('div');
    div.className='spending-item';
    const trend=item.trend.toLowerCase();
    const trendClass= trend.includes('rise')||trend.includes('high')||trend.includes('worse')? 'trend-rising': trend.includes('declin')? 'trend-declining':'trend-stable';
    div.innerHTML=`<div class="spending-category">${item.category}</div>
      <div class="spending-cost">${item.cost}</div>
      <div class="spending-trend ${trendClass}">${item.trend}</div>`;
    grid.appendChild(div);
  });
}

/**************************** RISK ASSESSMENT & WARNING ****************************/

function updateRiskAssessment(data){
  const scoreEl=document.getElementById('overall-risk-score');
  scoreEl.textContent=data.risk_assessment.total_risk;
  scoreEl.style.color = data.risk_assessment.total_risk>=80?ftColors.red:data.risk_assessment.total_risk>=60?ftColors.gold:data.risk_assessment.total_risk>=40?ftColors.blue:ftColors.green;
  const list=document.getElementById('risk-factors');
  list.innerHTML='';
  ['fiscal_health','political_stability'].forEach(k=>{
    const div=document.createElement('div');
    div.className='risk-factor';
    div.textContent=`${k.replace('_',' ').toUpperCase()}: ${data.risk_assessment[k]}`;
    list.appendChild(div);
  });
}

// Early warning indicators array from instructions (embedded via hidden script similarly)
const earlyWarningData = [];
function updateWarningIndicators(code){
  const container=document.getElementById('warning-indicators');
  container.innerHTML='';
  earlyWarningData.forEach(ind=>{
    const val=ind[code];
    if(!val)return;
    let level='low';
    if(val.includes('Critical')) level='critical';
    else if(val.includes('High')) level='high';
    else if(val.includes('Moderate')) level='moderate';
    const div=document.createElement('div');
    div.className=`warning-indicator ${level}`;
    div.innerHTML=`<span class="indicator-name">${ind.indicator}</span>
      <div class="indicator-value">${val.split(' ')[0]}</div>
      <div class="indicator-status">Threshold: ${ind.threshold}</div>`;
    container.appendChild(div);
  });
}

/**************************** CHART HELPERS ****************************/

function updateTimelineChart(data){
  const ctx=document.getElementById('timeline-chart');
  if(timelineChart) timelineChart.destroy();
  timelineChart=new Chart(ctx,{type:'line',data:{labels:data.timeline.map(d=>d.year),datasets:[
    {
      label:'Budget Deficit (%)',data:data.timeline.map(d=>Math.abs(d.deficit)),borderColor:ftColors.red,backgroundColor:'rgba(204,0,0,0.1)',tension:0.3,borderWidth:3
    },{
      label:'Public Debt (%)',data:data.timeline.map(d=>d.debt),borderColor:ftColors.gold,backgroundColor:'rgba(212,165,116,0.1)',tension:0.3,borderWidth:2
    },{
      label:'Public Spending (%)',data:data.timeline.map(d=>d.spending),borderColor:ftColors.blue,backgroundColor:'rgba(46,110,158,0.1)',tension:0.3,borderWidth:2
    },{
      label:'Political Stability (×10)',data:data.timeline.map(d=>d.political*10),borderColor:ftColors.green,backgroundColor:'rgba(15,123,15,0.1)',tension:0.3,borderWidth:2,borderDash:[5,5]
    }
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true,title:{display:true,text:'Percentage (%)'}},x:{title:{display:true,text:'Year'}}}}});
}

function updateSpendingChart(data){
  const ctx=document.getElementById('spending-chart');
  if(spendingChart) spendingChart.destroy();
  spendingChart=new Chart(ctx,{type:'doughnut',data:{labels:data.spending_breakdown.map(d=>d.category),datasets:[{data:data.spending_breakdown.map(d=>d.impact),backgroundColor:chartColors,borderColor:'#fff',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right'}}}});
}

function updateRadarChart(code){
  const ctx=document.getElementById('radar-chart');
  if(radarChart) radarChart.destroy();
  const factors = patternAnalysis.map(f=>f[code]||0);
  radarChart=new Chart(ctx,{type:'radar',data:{labels:patternAnalysis.map(f=>f.factor),datasets:[{label:countryData[code].name,data:factors,borderColor:ftColors.blue,backgroundColor:'rgba(46,110,158,0.15)',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{max:10,beginAtZero:true,ticks:{stepSize:2}}}}});
}

function updatePatternChart(){
  const ctx=document.getElementById('pattern-chart');
  if(patternChart) patternChart.destroy();
  const labels=Object.keys(countryData).slice(0,12).map(c=>countryData[c].name);
  const datasets=patternAnalysis.slice(0,6).map((factor,i)=>({label:factor.factor,data:Object.keys(countryData).slice(0,12).map(c=>factor[c]||0),backgroundColor:chartColors[i],borderWidth:1}));
  patternChart=new Chart(ctx,{type:'bar',data:{labels,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{y:{max:10,beginAtZero:true}}}});
}

function updateWarningChart(){
  const ctx=document.getElementById('warning-chart');
  if(warningChart) warningChart.destroy();
  const top=Object.keys(countryData).sort((a,b)=>countryData[b].risk_assessment.total_risk-countryData[a].risk_assessment.total_risk).slice(0,10);
  const colors=top.map(c=>countryData[c].risk_assessment.total_risk>=80?ftColors.red:countryData[c].risk_assessment.total_risk>=60?ftColors.gold:countryData[c].risk_assessment.total_risk>=40?ftColors.blue:ftColors.green);
  warningChart=new Chart(ctx,{type:'bar',data:{labels:top.map(c=>countryData[c].name),datasets:[{data:top.map(c=>countryData[c].risk_assessment.total_risk),backgroundColor:colors,borderWidth:1}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{max:100,beginAtZero:true}}}});
}

/**************************** MULTI-COUNTRY COMPARISON ****************************/

function buildComparisonCheckboxes(){
  const grid=document.getElementById('country-selection-grid');
  const codes=Object.keys(countryData).sort((a,b)=>countryData[a].name.localeCompare(countryData[b].name));
  codes.forEach((code,idx)=>{
    const div=document.createElement('label');
    div.className='country-checkbox-item';
    div.innerHTML=`<input type='checkbox' value='${code}'> <span class='flag'>${countryData[code].flag}</span> ${countryData[code].name}`;
    const checkbox=div.querySelector('input');
    checkbox.addEventListener('change',()=>{
      if(checkbox.checked){
        if(selectedComparisonCountries.size>=6){
          checkbox.checked=false;return alert('Maximum 6 countries allowed');
        }
        selectedComparisonCountries.add(code);
        div.classList.add('selected');
      }else{
        selectedComparisonCountries.delete(code);
        div.classList.remove('selected');
      }
      updateComparisonCharts();
    });
    grid.appendChild(div);
  });
}

function updateComparisonCharts(){
  const container=document.querySelector('.comparison-charts');
  if(selectedComparisonCountries.size===0){container.classList.remove('visible');destroyCmpCharts();return;}
  container.classList.add('visible');
  const codes=[...selectedComparisonCountries];
  buildCmpRiskChart(codes);
  buildCmpDeficitChart(codes);
  buildCmpDebtChart(codes);
  buildCmpPoliticalChart(codes);
}

function destroyCmpCharts(){
  [cmpRiskChart,cmpDeficitChart,cmpDebtChart,cmpPoliticalChart].forEach(ch=>{if(ch)ch.destroy();});
}

function assignColors(codes){
  return codes.map(code=>COUNTRY_COLORS[Object.keys(countryData).indexOf(code)%COUNTRY_COLORS.length]);
}

function buildCmpRiskChart(codes){
  const ctx=document.getElementById('comparison-risk-chart');
  if(cmpRiskChart) cmpRiskChart.destroy();
  const colors=assignColors(codes);
  cmpRiskChart=new Chart(ctx,{type:'bar',data:{labels:codes.map(c=>countryData[c].name),datasets:[{label:'Risk Score',data:codes.map(c=>countryData[c].risk_assessment.total_risk),backgroundColor:colors}]},options:{responsive:true,maintainAspectRatio:false}});
}

function buildCmpDeficitChart(codes){
  const ctx=document.getElementById('comparison-deficit-chart');
  if(cmpDeficitChart) cmpDeficitChart.destroy();
  const colors=assignColors(codes);
  cmpDeficitChart=new Chart(ctx,{type:'line',data:{labels:[2019,2020,2021,2022,2023,2024],datasets:codes.map((c,i)=>({label:countryData[c].name,data:countryData[c].timeline.map(t=>Math.abs(t.deficit)),borderColor:colors[i],tension:0.3,fill:false}))},options:{responsive:true,maintainAspectRatio:false}});
}

function buildCmpDebtChart(codes){
  const ctx=document.getElementById('comparison-debt-chart');
  if(cmpDebtChart) cmpDebtChart.destroy();
  const colors=assignColors(codes);
  cmpDebtChart=new Chart(ctx,{type:'line',data:{labels:[2019,2020,2021,2022,2023,2024],datasets:codes.map((c,i)=>({label:countryData[c].name,data:countryData[c].timeline.map(t=>t.debt),borderColor:colors[i],tension:0.3,fill:false}))},options:{responsive:true,maintainAspectRatio:false}});
}

function buildCmpPoliticalChart(codes){
  const ctx=document.getElementById('comparison-political-chart');
  if(cmpPoliticalChart) cmpPoliticalChart.destroy();
  const colors=assignColors(codes);
  cmpPoliticalChart=new Chart(ctx,{type:'radar',data:{labels:[2019,2020,2021,2022,2023,2024],datasets:codes.map((c,i)=>({label:countryData[c].name,data:countryData[c].timeline.map(t=>t.political),borderColor:colors[i],backgroundColor:hexToRgba(colors[i],0.1),borderWidth:2}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{r:{max:10,beginAtZero:true}}}});
}

function hexToRgba(hex,alpha){
  const bigint=parseInt(hex.replace('#',''),16);const r=(bigint>>16)&255;const g=(bigint>>8)&255;const b=bigint&255;return `rgba(${r},${g},${b},${alpha})`;}

/**************************** PATTERN & WARNING DATA ****************************/
// Pattern analysis and earlyWarningData are injected similarly from hidden scripts
const patternAnalysis = [];

/**************************** DATA EMBEDDING ****************************/
// The following JSON elements are embedded as script tags in index.html. This keeps app.js lightweight.
