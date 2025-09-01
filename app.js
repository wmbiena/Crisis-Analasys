// Economic Crisis Pattern Analyzer - JavaScript (Enhanced Version)
// Financial Times Style Dashboard with Full 27-Country Support + Multi-Country Comparison

/*************************************************
 *  GLOBAL CONSTANTS
 *************************************************/
// 30-color palette to ensure enough unique colors for multi-country charts
const COUNTRY_COLORS = [
  '#2E6E9E', '#4A8BC2', '#33808E', '#D4A574', '#6B8E23', '#8B7CA6',
  '#CD853F', '#B8860B', '#4682B4', '#5F9EA0', '#708090', '#6495ED',
  '#9370DB', '#BA55D3', '#8FBC8F', '#20B2AA', '#48D1CC', '#00CED1',
  '#FF7F50', '#F4A460', '#DDA0DD', '#98FB98', '#87CEEB', '#FF6347',
  '#40E0D0', '#EE82EE', '#90EE90', '#FFB6C1', '#FFA07A', '#C0C0C0'
];

// Base FT colors reused for single-country charts + metrics
const ftColors = {
  salmon: '#FFF1E5',
  blue: '#2E6E9E',
  gold: '#D4A574',
  red: '#CC0000',
  green: '#0F7B0F',
  charcoal: '#33302E',
  gray: '#6B6B6B'
};

/*************************************************
 *  DATA DEFINITIONS (FROM BACK-END JSON)
 *************************************************/
// countryData, patternAnalysis, earlyWarningData were generated previously
// To save space in this file, they are injected below via a build-time replace token.
// ===COUNTRY_DATA_START===
const countryData = /**PLACEHOLDER_COUNTRY_DATA**/ {};
// ===COUNTRY_DATA_END===

const patternAnalysis = /**PLACEHOLDER_PATTERN_ANALYSIS**/ [];
const earlyWarningData = /**PLACEHOLDER_EARLY_WARNING_DATA**/ [];

/*************************************************
 *  APPLICATION STATE
 *************************************************/
let currentCountry = 'France';
let currentFilter = 'all';
let filteredCountries = Object.keys(countryData);

// Chart instances (single-country views)
let timelineChart, spendingChart, radarChart, patternChart, warningChart;
// Chart instances (comparison view)
let comparisonRiskChart, comparisonDeficitChart, comparisonDebtChart, comparisonPoliticalChart;

/*************************************************
 *  INITIALIZATION
 *************************************************/
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeCategoryFilters();
  initializeCountrySearch();
  populateCountryDropdown();
  initializeComparisonSection();
  updateDashboard(currentCountry);
  updateComparisonCharts(['France', 'Germany']); // default comparison pair
});

/*************************************************
 *  NAVIGATION HANDLERS
 *************************************************/
function initializeNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const viewSections = document.querySelectorAll('.view-section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      viewSections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const targetSection = document.getElementById(`${btn.dataset.view}-view`);
      if (targetSection) targetSection.classList.add('active');
    });
  });
}

/*************************************************
 *  CATEGORY FILTERS (Header)
 *************************************************/
function initializeCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.category;
      filterCountriesByCategory(currentFilter);
      populateCountryDropdown();
    });
  });
}

function filterCountriesByCategory(category) {
  if (category === 'all') {
    filteredCountries = Object.keys(countryData);
  } else {
    filteredCountries = Object.keys(countryData).filter(code => {
      return (countryData[code].categories || []).includes(category);
    });
  }
}

/*************************************************
 *  COUNTRY SEARCH BOX
 *************************************************/
function initializeCountrySearch() {
  const searchInput = document.getElementById('country-search');
  const dropdown = document.getElementById('country-dropdown');

  searchInput.addEventListener('focus', () => dropdown.classList.remove('hidden'));
  searchInput.addEventListener('input', e => {
    const term = e.target.value.trim().toLowerCase();
    filterCountriesBySearch(term);
    populateCountryDropdown();
  });

  document.addEventListener('click', e => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

function filterCountriesBySearch(term) {
  filterCountriesByCategory(currentFilter);
  if (!term) return;
  filteredCountries = filteredCountries.filter(code => {
    const c = countryData[code];
    return c.name.toLowerCase().includes(term) || code.toLowerCase().includes(term);
  });
}

function populateCountryDropdown() {
  const dropdown = document.getElementById('country-dropdown');
  dropdown.innerHTML = '';
  const sorted = [...filteredCountries].sort((a, b) => countryData[a].name.localeCompare(countryData[b].name));
  sorted.forEach(code => {
    const c = countryData[code];
    const div = document.createElement('div');
    div.className = 'country-option';
    div.dataset.country = code;
    div.innerHTML = `<span class="flag">${c.flag}</span><span class="name">${c.name}</span>`;
    div.onclick = () => selectCountry(code);
    dropdown.appendChild(div);
  });
}

function selectCountry(code) {
  const { name, flag } = countryData[code];
  currentCountry = code;
  document.getElementById('selected-flag').textContent = flag;
  document.getElementById('selected-name').textContent = name;
  document.getElementById('country-search').value = '';
  document.getElementById('country-dropdown').classList.add('hidden');
  updateDashboard(code);
}

/*************************************************
 *  SINGLE-COUNTRY DASHBOARD UPDATE
 *************************************************/
function updateDashboard(code) {
  const data = countryData[code];
  if (!data) return;

  // ----- Metrics -----
  const latest = data.timeline[data.timeline.length - 1];
  const metrics = {
    deficit: Math.abs(latest.deficit),
    debt: latest.debt,
    spending: latest.spending,
    political: latest.political
  };
  updateMetricCard('deficit', metrics.deficit, valueLabel(metrics.deficit, '% GDP'), riskClassDeficit(metrics.deficit));
  updateMetricCard('debt', metrics.debt, valueLabel(metrics.debt, '% GDP'), riskClassDebt(metrics.debt));
  updateMetricCard('spending', metrics.spending, valueLabel(metrics.spending, '% GDP'), riskClassSpending(metrics.spending));
  updateMetricCard('political', metrics.political, `${metrics.political}/10`, riskClassPolitical(metrics.political));

  // ----- Spending breakdown grid -----
  renderSpendingGrid(data);
  // ----- Risk assessment summary -----
  renderRiskAssessment(data);
  // ----- Warning indicators -----
  renderWarningIndicators(code);
  // ----- Charts -----
  renderTimelineChart(data);
  renderSpendingChart(data);
  renderRadarChart(code);
  renderPatternChart();
  renderWarningChart();
}

function updateMetricCard(prefix, numericValue, displayValue, level) {
  const v = document.getElementById(`${prefix}-value`);
  const i = document.getElementById(`${prefix}-indicator`);
  const card = document.getElementById(`${prefix}-card`);
  if (!v || !i || !card) return;
  v.textContent = displayValue;
  i.textContent = indicatorText(prefix, numericValue);
  card.className = `metric-card ${level}`;
}

function valueLabel(v, suffix = '') {return `${v.toFixed(1)}${suffix}`;}
function riskClassDeficit(d){return d>5?'critical':d>3?'high':'moderate';}
function riskClassDebt(d){return d>120?'critical':d>100?'high':d>60?'moderate':'low';}
function riskClassSpending(s){return s>50?'critical':s>45?'high':'moderate';}
function riskClassPolitical(p){return p<3?'critical':p<5?'high':p<7?'moderate':'low';}
function indicatorText(type,val){
  switch(type){
    case 'deficit':return val>5?'Severe breach':val>3?'Above EU limit':'Within limits';
    case 'debt':return val>120?'Unsustainable':val>100?'High':val>60?'Elevated':'Sustainable';
    case 'spending':return val>50?'Excessive':val>45?'High':'Moderate';
    case 'political':return val<3?'Very unstable':val<5?'Unstable':val<7?'Moderate':'Stable';
    default:return '';
  }
}

/*************************************************
 *  SINGLE-COUNTRY SUB-COMPONENTS
 *************************************************/
function renderSpendingGrid(data){
  const container=document.getElementById('spending-breakdown');
  container.innerHTML='';
  data.spending_breakdown.forEach(item=>{
    const trend=item.trend.toLowerCase();
    const trendClass=trend.includes('rise')||trend.includes('high')||trend.includes('worsening')?'trend-rising':trend.includes('declin')?'trend-declining':'trend-stable';
    const el=document.createElement('div');
    el.className='spending-item';
    el.innerHTML=`<div class="spending-category">${item.category}</div><div class="spending-cost">${item.cost}</div><div class="spending-trend ${trendClass}">${item.trend}</div>`;
    container.appendChild(el);
  });
}

function renderRiskAssessment(data){
  document.getElementById('overall-risk-score').textContent=data.risk_assessment.total_risk;
  document.getElementById('overall-risk-score').style.color=data.risk_assessment.total_risk>=80?ftColors.red:data.risk_assessment.total_risk>=60?ftColors.gold:data.risk_assessment.total_risk>=40?ftColors.blue:ftColors.green;
  const container=document.getElementById('risk-factors');
  container.innerHTML='';
  ['fiscal_health','political_stability'].forEach(key=>{
    const div=document.createElement('div');div.className='risk-factor';div.textContent=`${key.replace('_',' ')}: ${data.risk_assessment[key]}`;container.appendChild(div);
  });
}

function renderWarningIndicators(code){
  const container=document.getElementById('warning-indicators');
  container.innerHTML='';
  earlyWarningData.forEach(ind=>{
    if(!ind[code])return;
    const status=ind[code];
    const level=status.includes('Critical')?'critical':status.includes('High')?'high':status.includes('Moderate')?'moderate':'low';
    const div=document.createElement('div');
    div.className=`warning-indicator ${level}`;
    div.innerHTML=`<span class="indicator-name">${ind.indicator}</span><div class="indicator-value">${status.split(' ')[0]}</div><div class="indicator-status">Threshold: ${ind.threshold}</div>`;
    container.appendChild(div);
  });
}

/*************************************************
 *  SINGLE-COUNTRY CHARTS
 *************************************************/
function createChart(ctx,config){return new Chart(ctx,config);} // helper

function renderTimelineChart(data){
  const ctx=document.getElementById('timeline-chart');
  if(!ctx)return; if(timelineChart)timelineChart.destroy();
  timelineChart=createChart(ctx,{type:'line',data:{labels:data.timeline.map(d=>d.year),datasets:[
    {label:'Budget Deficit (%)',data:data.timeline.map(d=>Math.abs(d.deficit)),borderColor:ftColors.red,backgroundColor:'rgba(204,0,0,0.1)',borderWidth:3,tension:0.3},
    {label:'Public Debt (%)',data:data.timeline.map(d=>d.debt),borderColor:ftColors.gold,backgroundColor:'rgba(212,165,116,0.1)',borderWidth:2,tension:0.3},
    {label:'Public Spending (%)',data:data.timeline.map(d=>d.spending),borderColor:ftColors.blue,backgroundColor:'rgba(46,110,158,0.1)',borderWidth:2,tension:0.3},
    {label:'Political Stability (×10)',data:data.timeline.map(d=>d.political*10),borderColor:ftColors.green,backgroundColor:'rgba(15,123,15,0.1)',borderWidth:2,borderDash:[5,5],tension:0.3}
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}}});
}

function renderSpendingChart(data){
  const ctx=document.getElementById('spending-chart');if(!ctx)return;if(spendingChart)spendingChart.destroy();
  spendingChart=createChart(ctx,{type:'doughnut',data:{labels:data.spending_breakdown.map(x=>x.category),datasets:[{data:data.spending_breakdown.map(x=>x.impact),backgroundColor:COUNTRY_COLORS.slice(0,data.spending_breakdown.length),borderColor:'#fff',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right'}}}});
}

function renderRadarChart(code){
  const ctx=document.getElementById('radar-chart');if(!ctx)return;if(radarChart)radarChart.destroy();
  const values=patternAnalysis.map(f=>f[code]||0);
  radarChart=createChart(ctx,{type:'radar',data:{labels:patternAnalysis.map(f=>f.factor),datasets:[{label:countryData[code].name,data:values,borderColor:ftColors.blue,backgroundColor:'rgba(46,110,158,0.1)',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{beginAtZero:true,max:10,ticks:{stepSize:2}}}});
}

function renderPatternChart(){
  const ctx=document.getElementById('pattern-chart');if(!ctx)return;if(patternChart)patternChart.destroy();
  const top=['USA','France','Germany','Italy','Japan','UK','Canada','Spain','China','India','Brazil','Russia'];
  const datasets=patternAnalysis.map((f,i)=>({label:f.factor,data:top.map(c=>f[c]||0),backgroundColor:COUNTRY_COLORS[i],borderColor:COUNTRY_COLORS[i],borderWidth:1}));
  patternChart=createChart(ctx,{type:'bar',data:{labels:top.map(c=>countryData[c].name),datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true,max:10}}}});
}

function renderWarningChart(){
  const ctx=document.getElementById('warning-chart');if(!ctx)return;if(warningChart)warningChart.destroy();
  const top=['France','Italy','Germany','Japan','UK','Spain','USA','China','Brazil','Russia'];
  const scores=top.map(c=>countryData[c].risk_assessment.total_risk);
  const colors=scores.map(s=>s>=80?ftColors.red:s>=60?ftColors.gold:s>=40?ftColors.blue:ftColors.green);
  warningChart=createChart(ctx,{type:'bar',data:{labels:top.map(c=>countryData[c].name),datasets:[{data:scores,backgroundColor:colors}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,max:100}}}});
}

/*************************************************
 *  MULTI-COUNTRY COMPARISON SECTION
 *************************************************/
function initializeComparisonSection(){
  const container=document.getElementById('country-checkboxes');
  const countryCodes=Object.keys(countryData).sort((a,b)=>countryData[a].name.localeCompare(countryData[b].name));
  countryCodes.forEach((code,idx)=>{
    const c=countryData[code];
    const label=document.createElement('label');
    label.className='country-checkbox-item';
    label.innerHTML=`<input type="checkbox" value="${code}"/><span class="flag">${c.flag}</span><span class="name">${c.name}</span>`;
    container.appendChild(label);
  });

  document.getElementById('compare-selected').addEventListener('click',()=>{
    const selected=[...container.querySelectorAll('input:checked')].map(i=>i.value);
    if(selected.length===0){alert('Select at least one country');return;}
    if(selected.length>6){alert('Please select max 6 countries for readability');return;}
    updateComparisonCharts(selected);
  });
}

function updateComparisonCharts(selectedCodes){
  renderComparisonRiskChart(selectedCodes);
  renderComparisonDeficitChart(selectedCodes);
  renderComparisonDebtChart(selectedCodes);
  renderComparisonPoliticalChart(selectedCodes);
  renderComparisonMetricCards(selectedCodes);
}

function pickColor(idx){return COUNTRY_COLORS[idx%COUNTRY_COLORS.length];}

/********* Comparison Charts *********/
function renderComparisonRiskChart(codes){
  const ctx=document.getElementById('comparison-risk-chart');if(!ctx)return;if(comparisonRiskChart)comparisonRiskChart.destroy();
  const dataValues=codes.map(c=>countryData[c].risk_assessment.total_risk);
  comparisonRiskChart=createChart(ctx,{type:'bar',data:{labels:codes.map(c=>countryData[c].name),datasets:[{data:dataValues,backgroundColor:codes.map((c,i)=>pickColor(i)),borderWidth:1}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,max:100}}}});
}

function renderComparisonDeficitChart(codes){
  const ctx=document.getElementById('comparison-deficit-chart');if(!ctx)return;if(comparisonDeficitChart)comparisonDeficitChart.destroy();
  const years=[2019,2020,2021,2022,2023,2024];
  const datasets=codes.map((code,idx)=>({label:countryData[code].name,data:countryData[code].timeline.map(t=>Math.abs(t.deficit)),borderColor:pickColor(idx),backgroundColor:'transparent',borderWidth:2,tension:0.3}));
  comparisonDeficitChart=createChart(ctx,{type:'line',data:{labels:years,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}}}});
}

function renderComparisonDebtChart(codes){
  const ctx=document.getElementById('comparison-debt-chart');if(!ctx)return;if(comparisonDebtChart)comparisonDebtChart.destroy();
  const years=[2019,2020,2021,2022,2023,2024];
  const datasets=codes.map((code,idx)=>({label:countryData[code].name,data:countryData[code].timeline.map(t=>t.debt),borderColor:pickColor(idx),backgroundColor:'transparent',borderWidth:2,dashed:[4,2],tension:0.3}));
  comparisonDebtChart=createChart(ctx,{type:'line',data:{labels:years,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}}}});
}

function renderComparisonPoliticalChart(codes){
  const ctx=document.getElementById('comparison-political-chart');if(!ctx)return;if(comparisonPoliticalChart)comparisonPoliticalChart.destroy();
  const years=[2019,2020,2021,2022,2023,2024];
  const datasets=codes.map((code,idx)=>({label:countryData[code].name,data:countryData[code].timeline.map(t=>t.political),borderColor:pickColor(idx),backgroundColor:'rgba(0,0,0,0)',borderWidth:2}));
  comparisonPoliticalChart=createChart(ctx,{type:'radar',data:{labels:years,datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top'}},scales:{r:{beginAtZero:true,max:10,ticks:{stepSize:2}}}}});
}

/********* Comparison Metric Cards *********/
function renderComparisonMetricCards(codes){
  const container=document.getElementById('comparison-metrics');
  container.innerHTML='';
  codes.forEach((code,idx)=>{const c=countryData[code];const latest=c.timeline[c.timeline.length-1];
    const card=document.createElement('div');card.className='comparison-metric-card';card.innerHTML=`<h4><span class="flag">${c.flag}</span>${c.name}</h4><div class="comparison-metric-values">${metricHtml('Deficit',Math.abs(latest.deficit)+'%')}${metricHtml('Debt',latest.debt+'%')}${metricHtml('Spending',latest.spending+'%')}${metricHtml('Political',latest.political+'/10')}</div>`;card.style.borderLeftColor=pickColor(idx);
    container.appendChild(card);
  });
}
function metricHtml(label,value){return `<div class="comparison-metric-value"><div class="label">${label}</div><div class="value">${value}</div></div>`;}
