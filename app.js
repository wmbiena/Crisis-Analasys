// Global Economic Crisis Pattern Analyzer - Enhanced JavaScript
// Financial Times Style Dashboard with 27 Countries and Crisis Events Timeline

// Import country data from the provided JSON - complete dataset with crisis events
const countryData = {
    "USA": {
        "name": "United States",
        "flag": "🇺🇸",
        "categories": ["G7", "High Income", "NATO"],
        "income_level": "High Income",
        "region": "North America",
        "timeline": [
            {"year": 2019, "deficit": -4.6, "debt": 108.2, "spending": 35.8, "growth": 2.2, "political": 6},
            {"year": 2020, "deficit": -14.9, "debt": 132.1, "spending": 43.8, "growth": -3.4, "political": 4},
            {"year": 2021, "deficit": -12.4, "debt": 133.0, "spending": 42.3, "growth": 5.7, "political": 5},
            {"year": 2022, "deficit": -5.5, "debt": 125.3, "spending": 39.2, "growth": 2.1, "political": 5},
            {"year": 2023, "deficit": -6.2, "debt": 123.3, "spending": 38.1, "growth": 2.5, "political": 4},
            {"year": 2024, "deficit": -6.4, "debt": 125.8, "spending": 38.5, "growth": 2.8, "political": 4}
        ],
        "risk_assessment": {"total_risk": 55, "fiscal_health": "Moderate Risk", "political_stability": "Moderate"},
        "crisis_events": [
            {"year": "2019", "event": "Trade War Escalation", "impact": "Economic uncertainty", "details": "US-China trade tensions peak, affecting global markets and domestic growth projections", "type": "Economic"},
            {"year": "2020", "event": "COVID-19 Pandemic Response", "impact": "Massive fiscal expansion", "details": "Unprecedented $6T stimulus package, deficit surged to 14.9% of GDP", "type": "Health"},
            {"year": "2021", "event": "Infrastructure Investment Act", "impact": "Long-term spending commitment", "details": "$1.2T infrastructure bill signed, addressing decades of underinvestment", "type": "Economic"},
            {"year": "2022", "event": "Inflation Surge", "impact": "Federal Reserve policy shift", "details": "Inflation reached 9.1%, forcing aggressive interest rate increases", "type": "Economic"},
            {"year": "2023", "event": "Regional Banking Crisis", "impact": "Financial sector stress", "details": "Silicon Valley Bank collapse, concerns about commercial real estate exposure", "type": "Economic"},
            {"year": "2024", "event": "Election Year Uncertainty", "impact": "Policy paralysis", "details": "Political gridlock ahead of presidential election, fiscal policy debates intensify", "type": "Political"}
        ],
        "spending_breakdown": [
            {"category": "Social Security", "impact": 25, "trend": "Rising", "cost": "$1400B annually"},
            {"category": "Medicare", "impact": 20, "trend": "Rising", "cost": "$1000B annually"},
            {"category": "Defense", "impact": 15, "trend": "Stable", "cost": "$800B annually"},
            {"category": "Interest Payments", "impact": 12, "trend": "Rising", "cost": "$640B annually"},
            {"category": "Medicaid", "impact": 10, "trend": "Rising", "cost": "$500B annually"},
            {"category": "Veterans Affairs", "impact": 8, "trend": "Rising", "cost": "$300B annually"},
            {"category": "Education", "impact": 6, "trend": "Stable", "cost": "$80B annually"},
            {"category": "Infrastructure", "impact": 4, "trend": "Rising", "cost": "$150B annually"}
        ]
    },
    "France": {
        "name": "France",
        "flag": "🇫🇷",
        "categories": ["G7", "High Income", "EU", "NATO"],
        "income_level": "High Income",
        "region": "Europe",
        "timeline": [
            {"year": 2019, "deficit": -3.0, "debt": 98.1, "spending": 53.4, "growth": 1.8, "political": 7},
            {"year": 2020, "deficit": -9.1, "debt": 114.6, "spending": 58.7, "growth": -7.9, "political": 5},
            {"year": 2021, "deficit": -6.5, "debt": 112.8, "spending": 58.8, "growth": 6.8, "political": 4},
            {"year": 2022, "deficit": -4.7, "debt": 111.9, "spending": 57.7, "growth": 2.5, "political": 4},
            {"year": 2023, "deficit": -5.4, "debt": 109.8, "spending": 56.9, "growth": 0.9, "political": 3},
            {"year": 2024, "deficit": -5.8, "debt": 113.0, "spending": 57.1, "growth": 0.8, "political": 2}
        ],
        "risk_assessment": {"total_risk": 85, "fiscal_health": "Critical", "political_stability": "Very Low"},
        "crisis_events": [
            {"year": "2019", "event": "Yellow Vest Protests Begin", "impact": "Spending increases", "details": "Mass protests led to €10B in fiscal concessions, undermining budgetary discipline", "type": "Social"},
            {"year": "2020", "event": "COVID-19 Pandemic", "impact": "Massive fiscal expansion", "details": "Deficit ballooned to 9.1% of GDP, debt soared above sustainable levels", "type": "Health"},
            {"year": "2021", "event": "Recovery Plan Launch", "impact": "EU funds dependency", "details": "€100B recovery plan partly funded by EU borrowing, raising sovereignty concerns", "type": "Economic"},
            {"year": "2022", "event": "Ukraine War Economic Impact", "impact": "Energy crisis", "details": "Energy costs surge, inflation pressures, defense spending increases", "type": "Economic"},
            {"year": "2023", "event": "Pension Reform Protests", "impact": "Political paralysis", "details": "Government used Article 49.3, massive strikes across sectors, legitimacy crisis", "type": "Political"},
            {"year": "2024", "event": "Government Collapse (December)", "impact": "Budget deadlock", "details": "Barnier government fell via no-confidence vote over €60B austerity budget", "type": "Political"}
        ],
        "spending_breakdown": [
            {"category": "Pension System", "impact": 30, "trend": "Worsening", "cost": "€350B annually"},
            {"category": "Healthcare", "impact": 25, "trend": "Rising", "cost": "€270B annually"},
            {"category": "Public Wages", "impact": 15, "trend": "Stable", "cost": "€140B annually"},
            {"category": "Unemployment", "impact": 10, "trend": "Rising", "cost": "€40B annually"},
            {"category": "Interest Payments", "impact": 8, "trend": "Rising", "cost": "€63B annually"},
            {"category": "Green Transition", "impact": 7, "trend": "Rising", "cost": "€100B total"},
            {"category": "Regional Subsidies", "impact": 3, "trend": "Stable", "cost": "€25B annually"},
            {"category": "Defense", "impact": 2, "trend": "Rising", "cost": "€47B annually"}
        ]
    },
    "Nigeria": {
        "name": "Nigeria",
        "flag": "🇳🇬",
        "categories": ["BRICS Partner", "Lower Middle Income"],
        "income_level": "Lower Middle Income",
        "region": "Africa",
        "timeline": [
            {"year": 2019, "deficit": -5.5, "debt": 36.3, "spending": 7.3, "growth": 2.2, "political": 5},
            {"year": 2020, "deficit": -17.5, "debt": 61.5, "spending": 17.3, "growth": -1.8, "political": 5},
            {"year": 2021, "deficit": -5.5, "debt": 53.9, "spending": 12.1, "growth": 3.6, "political": 5},
            {"year": 2022, "deficit": -5.5, "debt": 47.1, "spending": 10.3, "growth": 3.3, "political": 5},
            {"year": 2023, "deficit": -3.5, "debt": 38.1, "spending": 9.1, "growth": 2.9, "political": 5},
            {"year": 2024, "deficit": -5.5, "debt": 38.1, "spending": 7.1, "growth": 3.2, "political": 5}
        ],
        "risk_assessment": {"total_risk": 75, "fiscal_health": "High Risk", "political_stability": "Low"},
        "crisis_events": [
            {"year": "2019", "event": "Insecurity Escalation", "impact": "Economic disruption", "details": "Boko Haram attacks intensify, banditry spreads, affecting agricultural output", "type": "Social"},
            {"year": "2020", "event": "Oil Price Collapse & COVID-19", "impact": "Revenue crisis", "details": "Oil revenues crashed 60%, pandemic lockdowns, deficit surged to 17.5% of GDP", "type": "Economic"},
            {"year": "2020", "event": "#EndSARS Protests", "impact": "Social unrest", "details": "Massive youth protests against police brutality, political system legitimacy questioned", "type": "Social"},
            {"year": "2021", "event": "Currency Crisis Deepens", "impact": "Exchange rate instability", "details": "Naira devaluation accelerates, multiple exchange rates create distortions", "type": "Economic"},
            {"year": "2023", "event": "Fuel Subsidy Removal", "impact": "Inflation shock", "details": "Tinubu removes decades-old fuel subsidies, inflation soars above 25%", "type": "Economic"},
            {"year": "2024", "event": "Banking Sector Reforms", "impact": "Financial restructuring", "details": "Central Bank recapitalization requirements, several banks face consolidation", "type": "Economic"}
        ],
        "spending_breakdown": [
            {"category": "Infrastructure", "impact": 25, "trend": "Very High", "cost": "₦7.5T annually"},
            {"category": "Education", "impact": 20, "trend": "Rising", "cost": "₦6T annually"},
            {"category": "Healthcare", "impact": 16, "trend": "Rising", "cost": "₦4.8T annually"},
            {"category": "Social Welfare", "impact": 15, "trend": "Rising", "cost": "₦4.5T annually"},
            {"category": "Interest Payments", "impact": 11, "trend": "High", "cost": "₦3.3T annually"},
            {"category": "Defense", "impact": 7, "trend": "Rising", "cost": "₦2.1T annually"},
            {"category": "Subsidies", "impact": 4, "trend": "High", "cost": "₦1.2T annually"},
            {"category": "Public Investment", "impact": 2, "trend": "Rising", "cost": "₦600B annually"}
        ]
    },
    "Germany": {
        "name": "Germany",
        "flag": "🇩🇪",
        "categories": ["G7", "High Income", "EU", "NATO"],
        "income_level": "High Income",
        "region": "Europe",
        "timeline": [
            {"year": 2019, "deficit": -2.8, "debt": 63.9, "spending": 44.4, "growth": 1.9, "political": 7},
            {"year": 2020, "deficit": -11.7, "debt": 86.2, "spending": 50.5, "growth": -7.1, "political": 6},
            {"year": 2021, "deficit": -4.7, "debt": 74.3, "spending": 49.4, "growth": 4.8, "political": 5},
            {"year": 2022, "deficit": -3.5, "debt": 68.8, "spending": 48.9, "growth": 1.6, "political": 8},
            {"year": 2023, "deficit": -1.4, "debt": 66.7, "spending": 47.7, "growth": -0.6, "political": 5},
            {"year": 2024, "deficit": -1.1, "debt": 65.7, "spending": 45.6, "growth": 0.1, "political": 4}
        ],
        "risk_assessment": {"total_risk": 35, "fiscal_health": "Stable", "political_stability": "Moderate"},
        "crisis_events": [
            {"year": "2019", "event": "Coalition Challenges", "impact": "Political uncertainty", "details": "CDU leadership changes, coalition tensions over migration and climate policy", "type": "Political"},
            {"year": "2020", "event": "COVID-19 Response", "impact": "Massive fiscal intervention", "details": "€1.3T stimulus package, debt brake suspended, economy contracts 7.1%", "type": "Health"},
            {"year": "2021", "event": "Merkel Era Ends", "impact": "Leadership transition", "details": "16-year Merkel chancellorship ends, new coalition government formation challenges", "type": "Political"},
            {"year": "2022", "event": "Energy Crisis from Ukraine War", "impact": "Economic restructuring", "details": "Russian gas dependency crisis, energy costs surge, industrial competitiveness threatened", "type": "Economic"},
            {"year": "2023", "event": "Industrial Recession", "impact": "Manufacturing decline", "details": "Energy-intensive industries struggle, automotive sector faces EV transition challenges", "type": "Economic"},
            {"year": "2024", "event": "Coalition Government Instability", "impact": "Policy paralysis", "details": "Traffic light coalition faces internal disputes, budget disagreements intensify", "type": "Political"}
        ],
        "spending_breakdown": [
            {"category": "Social Security/Pensions", "impact": 30, "trend": "Rising", "cost": "€215B annually"},
            {"category": "Healthcare", "impact": 19, "trend": "Rising", "cost": "€180B annually"},
            {"category": "Education", "impact": 15, "trend": "Stable", "cost": "€105B annually"},
            {"category": "Interest Payments", "impact": 13, "trend": "Rising", "cost": "€95B annually"},
            {"category": "Defense", "impact": 10, "trend": "Stable", "cost": "€75B annually"},
            {"category": "Infrastructure", "impact": 6, "trend": "Rising", "cost": "€45B annually"},
            {"category": "Unemployment Benefits", "impact": 4, "trend": "Stable", "cost": "€30B annually"},
            {"category": "Public Administration", "impact": 3, "trend": "Stable", "cost": "€20B annually"}
        ]
    }
};

// Pattern analysis data for all countries
const patternAnalysis = [
    {"factor": "Fiscal Deterioration", "weight": 0.25, "usa": 6, "france": 7, "germany": 5, "italy": 8, "japan": 5, "uk": 6, "canada": 4, "spain": 6, "china": 4, "india": 7, "brazil": 8, "russia": 9, "nigeria": 6},
    {"factor": "Political Fragmentation", "weight": 0.2, "usa": 4, "france": 9, "germany": 4, "italy": 6, "japan": 3, "uk": 5, "canada": 2, "spain": 6, "china": 1, "india": 3, "brazil": 6, "russia": 7, "nigeria": 5},
    {"factor": "Structural Rigidity", "weight": 0.2, "usa": 7, "france": 9, "germany": 5, "italy": 7, "japan": 6, "uk": 4, "canada": 3, "spain": 5, "china": 2, "india": 5, "brazil": 6, "russia": 5, "nigeria": 7},
    {"factor": "External Pressure", "weight": 0.15, "usa": 2, "france": 8, "germany": 2, "italy": 7, "japan": 3, "uk": 5, "canada": 1, "spain": 6, "china": 3, "india": 4, "brazil": 6, "russia": 9, "nigeria": 8},
    {"factor": "Reform Resistance", "weight": 0.1, "usa": 6, "france": 10, "germany": 3, "italy": 6, "japan": 7, "uk": 4, "canada": 2, "spain": 5, "china": 1, "india": 5, "brazil": 6, "russia": 8, "nigeria": 6},
    {"factor": "Market Confidence", "weight": 0.1, "usa": 8, "france": 6, "germany": 9, "italy": 5, "japan": 7, "uk": 6, "canada": 9, "spain": 6, "china": 6, "india": 6, "brazil": 4, "russia": 3, "nigeria": 4}
];

// Early warning indicators
const earlyWarningData = [
    {"indicator": "Budget Deficit > 5% GDP", "threshold": "5%", "usa": "6.4% (High)", "france": "5.8% (High)", "germany": "1.1% (Low)", "nigeria": "5.5% (High)"},
    {"indicator": "Public Debt > 100% GDP", "threshold": "100%", "usa": "125.8% (Critical)", "france": "113.0% (Critical)", "germany": "65.7% (Moderate)", "nigeria": "38.1% (Low)"},
    {"indicator": "Public Spending > 50% GDP", "threshold": "50%", "usa": "38.5% (Low)", "france": "57.1% (Critical)", "germany": "45.6% (Low)", "nigeria": "7.1% (Low)"},
    {"indicator": "Political Stability < 5", "threshold": "5", "usa": "4 (High)", "france": "2 (Critical)", "germany": "4 (High)", "nigeria": "5 (Moderate)"}
];

// Professional FT Color palette (replacing red/alarming colors)
const professionalColors = [
    '#2E6E9E', // Primary Blue (FT Blue)
    '#4A8BC2', // Secondary Blue (Light Blue)
    '#33808E', // Professional Teal
    '#D4A574', // FT Orange/Gold
    '#6B8E23', // Olive Green
    '#8B7CA6', // Muted Purple
    '#5D878F', // Slate Blue
    '#964325', // Earth Brown
    '#13343B', // Deep Teal
    '#B4413C'  // Muted Terracotta
];

// Current selected country and filters
let currentCountry = 'France';
let currentFilter = 'all';
let filteredCountries = [];

// Chart instances
let timelineChart, spendingChart, radarChart, patternChart, warningChart, comparativeChart, regionalChart, riskFactorsChart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced application...');
    initializeApplication();
});

// Initialize all components
function initializeApplication() {
    initializeNavigation();
    populateCountryOptions();
    initializeCountrySelector();
    initializeFilters();
    initializeSearch();
    updateDashboard(currentCountry);
    console.log('Application initialized successfully');
}

// Navigation functionality
function initializeNavigation() {
    console.log('Initializing navigation...');
    const navBtns = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');
    
    navBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Nav button clicked:', btn.dataset.view);
            const targetView = btn.dataset.view;
            
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            viewSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            const targetSection = document.getElementById(`${targetView}-view`);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('Switched to view:', targetView);
                
                // Update specific charts based on view
                setTimeout(() => {
                    if (targetView === 'comparative') {
                        updateComparativeAnalysis();
                    }
                }, 100);
            }
        });
    });
}

// Populate country dropdown with all countries
function populateCountryOptions() {
    console.log('Populating country options...');
    const countrySelect = document.getElementById('country-select');
    if (!countrySelect) {
        console.error('Country select element not found');
        return;
    }
    
    countrySelect.innerHTML = '';
    
    Object.entries(countryData).forEach(([key, country]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${country.flag} ${country.name}`;
        option.dataset.categories = JSON.stringify(country.categories);
        option.dataset.incomeLevel = country.income_level;
        option.dataset.region = country.region;
        option.dataset.name = country.name.toLowerCase();
        countrySelect.appendChild(option);
    });
    
    // Set initial selection
    countrySelect.value = currentCountry;
    console.log('Country options populated, total:', Object.keys(countryData).length);
}

// Enhanced country selector functionality
function initializeCountrySelector() {
    console.log('Initializing enhanced country selector...');
    const countrySelect = document.getElementById('country-select');
    
    if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
            const newCountry = e.target.value;
            console.log('Country changed from', currentCountry, 'to:', newCountry);
            currentCountry = newCountry;
            updateDashboard(currentCountry);
        });
        
        // Also listen for input changes for better UX
        countrySelect.addEventListener('input', (e) => {
            const newCountry = e.target.value;
            if (newCountry && newCountry !== currentCountry && countryData[newCountry]) {
                console.log('Country input changed to:', newCountry);
                currentCountry = newCountry;
                updateDashboard(currentCountry);
            }
        });
        
        console.log('Country selector event listeners added');
    } else {
        console.error('Country selector not found!');
    }
}

// Initialize category filters
function initializeFilters() {
    console.log('Initializing category filters...');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.dataset.filter;
            console.log('Filter applied:', filter);
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Apply filter
            currentFilter = filter;
            applyCountryFilter(filter);
        });
    });
    console.log('Filter buttons initialized:', filterBtns.length);
}

// Apply category filter to country dropdown
function applyCountryFilter(filter) {
    console.log('Applying filter:', filter);
    const countrySelect = document.getElementById('country-select');
    const options = countrySelect.querySelectorAll('option');
    let visibleOptions = [];
    
    options.forEach(option => {
        const categories = JSON.parse(option.dataset.categories || '[]');
        const incomeLevel = option.dataset.incomeLevel;
        
        let shouldShow = true;
        
        if (filter !== 'all') {
            shouldShow = categories.includes(filter) || incomeLevel === filter;
        }
        
        if (shouldShow) {
            option.style.display = '';
            option.classList.remove('hidden');
            visibleOptions.push(option);
        } else {
            option.style.display = 'none';
            option.classList.add('hidden');
        }
    });
    
    console.log('Filter applied, visible countries:', visibleOptions.length);
    
    // If current country is filtered out, select the first visible option
    const currentOption = countrySelect.querySelector(`option[value="${currentCountry}"]`);
    if (currentOption && currentOption.classList.contains('hidden') && visibleOptions.length > 0) {
        const firstVisible = visibleOptions[0];
        currentCountry = firstVisible.value;
        countrySelect.value = currentCountry;
        updateDashboard(currentCountry);
        console.log('Switched to first visible country:', currentCountry);
    }
}

// Initialize search functionality
function initializeSearch() {
    console.log('Initializing search functionality...');
    const searchInput = document.getElementById('country-search');
    if (!searchInput) {
        console.error('Search input not found');
        return;
    }
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        
        const countrySelect = document.getElementById('country-select');
        const options = countrySelect.querySelectorAll('option');
        
        options.forEach(option => {
            const countryName = option.dataset.name || option.textContent.toLowerCase();
            const matchesSearch = searchTerm === '' || countryName.includes(searchTerm);
            const matchesFilter = !option.classList.contains('hidden');
            
            if (matchesSearch && matchesFilter) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
    });
    console.log('Search functionality initialized');
}

// Update entire dashboard with new country data
function updateDashboard(country) {
    console.log('Updating dashboard for country:', country);
    const data = countryData[country];
    
    if (!data) {
        console.error('No data found for country:', country);
        return;
    }
    
    try {
        updateCountryInfo(data);
        updateMetrics(data);
        updateCrisisTimeline(data.crisis_events);
        updateSpendingBreakdown(data);
        updateRiskAssessment(data);
        updateWarningIndicators(country);
        
        // Update charts with delay to ensure DOM is ready
        setTimeout(() => {
            updateTimelineChart(data);
            updateSpendingChart(data);
            updateRadarChart(country);
            updatePatternChart();
            updateWarningChart();
            updateRiskFactorsChart(data);
        }, 100);
        
        console.log('Dashboard updated successfully for:', data.name);
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

// Update country information header
function updateCountryInfo(data) {
    const countryFlag = document.getElementById('country-flag');
    const countryName = document.getElementById('country-name');
    const countryTags = document.getElementById('country-tags');
    const countryRegion = document.getElementById('country-region');
    const countryIncome = document.getElementById('country-income');
    
    if (countryFlag) countryFlag.textContent = data.flag;
    if (countryName) countryName.textContent = data.name;
    if (countryRegion) countryRegion.textContent = data.region;
    if (countryIncome) countryIncome.textContent = data.income_level;
    
    // Update tags
    if (countryTags) {
        countryTags.innerHTML = '';
        data.categories.forEach(category => {
            const tag = document.createElement('span');
            tag.className = `country-tag ${getCategoryClass(category)}`;
            tag.textContent = category;
            countryTags.appendChild(tag);
        });
    }
}

// Get CSS class for category tags
function getCategoryClass(category) {
    const classMap = {
        'G7': 'tag-g7',
        'BRICS': 'tag-brics',
        'BRICS Partner': 'tag-brics',
        'High Income': 'tag-high-income',
        'Upper Middle Income': 'tag-upper-middle',
        'Lower Middle Income': 'tag-lower-middle',
        'EU': 'tag-eu',
        'NATO': 'tag-nato',
        'OECD': 'tag-oecd'
    };
    return classMap[category] || 'tag-default';
}

// Update Crisis Events Timeline
function updateCrisisTimeline(crisisEvents) {
    console.log('Updating crisis timeline with', crisisEvents.length, 'events');
    const timelineContainer = document.getElementById('crisis-timeline');
    if (!timelineContainer) {
        console.error('Crisis timeline container not found');
        return;
    }
    
    timelineContainer.innerHTML = '';
    
    // Group events by year
    const eventsByYear = {};
    crisisEvents.forEach(event => {
        if (!eventsByYear[event.year]) {
            eventsByYear[event.year] = [];
        }
        eventsByYear[event.year].push(event);
    });
    
    // Create timeline for years 2019-2024
    for (let year = 2019; year <= 2024; year++) {
        const yearEvents = eventsByYear[year.toString()] || [];
        
        if (yearEvents.length > 0) {
            yearEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = `crisis-event type-${event.type.toLowerCase()}`;
                eventCard.style.cursor = 'pointer';
                eventCard.innerHTML = `
                    <div class="event-year">${event.year}</div>
                    <div class="event-title">${event.event}</div>
                    <div class="event-impact">${event.impact}</div>
                    <div class="event-type type-${event.type.toLowerCase()}">${event.type}</div>
                `;
                
                // Add click event for detailed view
                eventCard.addEventListener('click', (e) => {
                    e.preventDefault();
                    showEventDetails(event);
                });
                
                // Add hover effects
                eventCard.addEventListener('mouseenter', () => {
                    eventCard.style.transform = 'translateY(-3px)';
                    eventCard.style.boxShadow = '0 6px 20px rgba(51, 48, 46, 0.2)';
                });
                
                eventCard.addEventListener('mouseleave', () => {
                    eventCard.style.transform = 'translateY(0)';
                    eventCard.style.boxShadow = '0 2px 8px rgba(51, 48, 46, 0.1)';
                });
                
                timelineContainer.appendChild(eventCard);
            });
        } else {
            // Create placeholder for years with no events
            const emptyCard = document.createElement('div');
            emptyCard.className = 'crisis-event empty';
            emptyCard.style.opacity = '0.6';
            emptyCard.innerHTML = `
                <div class="event-year">${year}</div>
                <div class="event-title">No major events</div>
                <div class="event-impact">Relatively stable period</div>
                <div class="event-type type-stable">Stable</div>
            `;
            timelineContainer.appendChild(emptyCard);
        }
    }
    
    console.log('Crisis timeline updated successfully');
}

// Show event details in modal
function showEventDetails(event) {
    console.log('Showing event details for:', event.event);
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('event-details-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'event-details-modal';
        modal.className = 'event-details';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        modal.innerHTML = `
            <div class="event-details-content" style="
                background-color: #ffffff;
                border-radius: 12px;
                padding: 32px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <button class="event-details-close" style="
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #6B6B6B;
                    padding: 4px;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                ">&times;</button>
                <h3 id="modal-event-title" style="color: #33302E; margin-bottom: 16px; font-size: 20px;"></h3>
                <div class="event-meta" style="display: flex; gap: 16px; margin-bottom: 16px;">
                    <span class="event-year-detail" id="modal-event-year" style="background: #2E6E9E; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;"></span>
                    <span class="event-type-detail" id="modal-event-type" style="background: #D4A574; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;"></span>
                </div>
                <div class="event-impact-detail" id="modal-event-impact" style="color: #6B6B6B; font-style: italic; margin-bottom: 16px; font-size: 14px;"></div>
                <div class="event-details-text" id="modal-event-details" style="color: #33302E; line-height: 1.6; font-size: 14px;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.className === 'event-details-close') {
                modal.style.display = 'none';
            }
        });
        
        // Add hover effect to close button
        const closeBtn = modal.querySelector('.event-details-close');
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.backgroundColor = '#f0f0f0';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.backgroundColor = 'transparent';
        });
    }
    
    // Update modal content
    document.getElementById('modal-event-title').textContent = event.event;
    document.getElementById('modal-event-year').textContent = event.year;
    document.getElementById('modal-event-type').textContent = event.type;
    document.getElementById('modal-event-impact').textContent = event.impact;
    document.getElementById('modal-event-details').textContent = event.details;
    
    // Show modal
    modal.style.display = 'flex';
}

// Update key metrics cards
function updateMetrics(data) {
    const currentYear = data.timeline[data.timeline.length - 1];
    
    // Deficit
    const deficitValue = document.getElementById('deficit-value');
    const deficitIndicator = document.getElementById('deficit-indicator');
    const deficitCard = document.getElementById('deficit-card');
    
    if (deficitValue && deficitIndicator && deficitCard) {
        deficitValue.textContent = `${Math.abs(currentYear.deficit).toFixed(1)}% GDP`;
        deficitIndicator.textContent = 
            Math.abs(currentYear.deficit) > 5 ? 'Violates EU 3% rule' : 
            Math.abs(currentYear.deficit) > 3 ? 'Above EU threshold' : 'Within limits';
        
        deficitCard.className = 'metric-card ' + 
            (Math.abs(currentYear.deficit) > 5 ? 'critical' : 
             Math.abs(currentYear.deficit) > 3 ? 'high' : 'moderate');
    }
    
    // Debt
    const debtValue = document.getElementById('debt-value');
    const debtIndicator = document.getElementById('debt-indicator');
    const debtCard = document.getElementById('debt-card');
    
    if (debtValue && debtIndicator && debtCard) {
        debtValue.textContent = `${currentYear.debt.toFixed(1)}% GDP`;
        debtIndicator.textContent = 
            currentYear.debt > 120 ? 'Extremely high' : 
            currentYear.debt > 100 ? 'High risk level' : 
            currentYear.debt > 60 ? 'Above EU target' : 'Sustainable';
        
        debtCard.className = 'metric-card ' + 
            (currentYear.debt > 120 ? 'critical' : 
             currentYear.debt > 100 ? 'high' : 
             currentYear.debt > 60 ? 'moderate' : 'low');
    }
    
    // Spending
    const spendingValue = document.getElementById('spending-value');
    const spendingIndicator = document.getElementById('spending-indicator');
    const spendingCard = document.getElementById('spending-card');
    
    if (spendingValue && spendingIndicator && spendingCard) {
        spendingValue.textContent = `${currentYear.spending.toFixed(1)}% GDP`;
        spendingIndicator.textContent = 
            currentYear.spending > 50 ? 'Very high spending' : 
            currentYear.spending > 45 ? 'High spending' : 'Moderate spending';
        
        spendingCard.className = 'metric-card ' + 
            (currentYear.spending > 50 ? 'critical' : 
             currentYear.spending > 45 ? 'high' : 'moderate');
    }
    
    // Political Stability
    const politicalValue = document.getElementById('political-value');
    const politicalIndicator = document.getElementById('political-indicator');
    const politicalCard = document.getElementById('political-card');
    
    if (politicalValue && politicalIndicator && politicalCard) {
        politicalValue.textContent = `${currentYear.political}/10`;
        politicalIndicator.textContent = 
            currentYear.political < 3 ? 'Very unstable' : 
            currentYear.political < 5 ? 'Unstable' : 
            currentYear.political < 7 ? 'Moderate' : 'Stable';
        
        politicalCard.className = 'metric-card ' + 
            (currentYear.political < 3 ? 'critical' : 
             currentYear.political < 5 ? 'high' : 
             currentYear.political < 7 ? 'moderate' : 'low');
    }
}

// Update spending breakdown
function updateSpendingBreakdown(data) {
    const container = document.getElementById('spending-breakdown');
    if (!container) return;
    
    container.innerHTML = '';
    
    data.spending_breakdown.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'spending-item';
        
        const trendClass = getTrendClass(item.trend);
        
        itemElement.innerHTML = `
            <div class="spending-category">${item.category}</div>
            <div class="spending-cost">${item.cost}</div>
            <div class="spending-trend ${trendClass}">${item.trend}</div>
        `;
        container.appendChild(itemElement);
    });
}

// Get trend class for spending items
function getTrendClass(trend) {
    const trendLower = trend.toLowerCase();
    if (trendLower.includes('rising') || trendLower.includes('worsening') || 
        trendLower.includes('high') || trendLower.includes('very')) {
        return 'trend-rising';
    } else if (trendLower.includes('declining')) {
        return 'trend-declining';
    }
    return 'trend-stable';
}

// Update risk assessment
function updateRiskAssessment(data) {
    const risk = data.risk_assessment;
    
    const riskScoreElement = document.getElementById('overall-risk-score');
    if (riskScoreElement) {
        riskScoreElement.textContent = risk.total_risk;
        riskScoreElement.style.color = 
            risk.total_risk >= 80 ? professionalColors[2] :
            risk.total_risk >= 60 ? professionalColors[3] :
            risk.total_risk >= 40 ? professionalColors[0] : professionalColors[4];
    }
    
    // Update risk details
    const fiscalHealth = document.getElementById('fiscal-health');
    const politicalStability = document.getElementById('political-stability');
    
    if (fiscalHealth) fiscalHealth.textContent = risk.fiscal_health;
    if (politicalStability) politicalStability.textContent = risk.political_stability;
}

// Update warning indicators
function updateWarningIndicators(country) {
    const container = document.getElementById('warning-indicators');
    if (!container) return;
    
    container.innerHTML = '';
    
    earlyWarningData.forEach(indicator => {
        const countryKey = country.toLowerCase();
        const value = indicator[countryKey];
        if (!value) return;
        
        const level = value.includes('Critical') ? 'critical' : 
                     value.includes('High') ? 'high' : 
                     value.includes('Moderate') ? 'moderate' : 'low';
        
        const indicatorElement = document.createElement('div');
        indicatorElement.className = `warning-indicator ${level}`;
        indicatorElement.innerHTML = `
            <span class="indicator-name">${indicator.indicator}</span>
            <div class="indicator-value">${value.split(' ')[0]}</div>
            <div class="indicator-status">Threshold: ${indicator.threshold}</div>
        `;
        container.appendChild(indicatorElement);
    });
}

// Chart update functions with professional colors
function updateTimelineChart(data) {
    const ctx = document.getElementById('timeline-chart');
    if (!ctx) return;
    
    if (timelineChart) {
        timelineChart.destroy();
    }
    
    timelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.timeline.map(d => d.year),
            datasets: [
                {
                    label: 'Budget Deficit (%)',
                    data: data.timeline.map(d => Math.abs(d.deficit)),
                    borderColor: professionalColors[2],
                    backgroundColor: professionalColors[2] + '20',
                    borderWidth: 3,
                    tension: 0.3
                },
                {
                    label: 'Public Debt (%)',
                    data: data.timeline.map(d => d.debt),
                    borderColor: professionalColors[3],
                    backgroundColor: professionalColors[3] + '20',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Public Spending (%)',
                    data: data.timeline.map(d => d.spending),
                    borderColor: professionalColors[0],
                    backgroundColor: professionalColors[0] + '20',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Political Stability (×10)',
                    data: data.timeline.map(d => d.political * 10),
                    borderColor: professionalColors[4],
                    backgroundColor: professionalColors[4] + '20',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function updateSpendingChart(data) {
    const ctx = document.getElementById('spending-chart');
    if (!ctx) return;
    
    if (spendingChart) {
        spendingChart.destroy();
    }
    
    spendingChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.spending_breakdown.map(d => d.category),
            datasets: [{
                data: data.spending_breakdown.map(d => d.impact),
                backgroundColor: professionalColors,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const item = data.spending_breakdown[context.dataIndex];
                            return [`Cost: ${item.cost}`, `Trend: ${item.trend}`];
                        }
                    }
                }
            }
        }
    });
}

function updateRadarChart(country) {
    const ctx = document.getElementById('radar-chart');
    if (!ctx) return;
    
    if (radarChart) {
        radarChart.destroy();
    }
    
    const countryKey = country.toLowerCase();
    const factors = patternAnalysis.map(p => p[countryKey] || 0);
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: patternAnalysis.map(p => p.factor),
            datasets: [{
                label: countryData[country].name,
                data: factors,
                borderColor: professionalColors[0],
                backgroundColor: professionalColors[0] + '20',
                borderWidth: 2,
                pointBackgroundColor: professionalColors[0],
                pointBorderColor: '#ffffff',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            }
        }
    });
}

function updatePatternChart() {
    const ctx = document.getElementById('pattern-chart');
    if (!ctx) return;
    
    if (patternChart) {
        patternChart.destroy();
    }
    
    const countries = ['usa', 'france', 'nigeria', 'germany'];
    const countryNames = countries.map(c => {
        const countryKey = c.toUpperCase();
        return countryData[countryKey]?.name || c;
    });
    
    const datasets = patternAnalysis.map((factor, index) => ({
        label: factor.factor,
        data: countries.map(c => factor[c] || 0),
        backgroundColor: professionalColors[index % professionalColors.length],
        borderColor: professionalColors[index % professionalColors.length],
        borderWidth: 1
    }));
    
    patternChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countryNames,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 10,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Risk Score (0-10)'
                    }
                }
            }
        }
    });
}

function updateWarningChart() {
    const ctx = document.getElementById('warning-chart');
    if (!ctx) return;
    
    if (warningChart) {
        warningChart.destroy();
    }
    
    const countries = Object.keys(countryData);
    const countryNames = countries.map(c => countryData[c].name);
    const riskScores = countries.map(c => countryData[c].risk_assessment.total_risk);
    
    const colors = riskScores.map(score => 
        score >= 80 ? professionalColors[2] :
        score >= 60 ? professionalColors[3] :
        score >= 40 ? professionalColors[0] : professionalColors[4]
    );
    
    warningChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countryNames,
            datasets: [{
                label: 'Crisis Risk Score',
                data: riskScores,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Risk Score (%)'
                    }
                }
            }
        }
    });
}

function updateRiskFactorsChart(data) {
    const ctx = document.getElementById('risk-factors-chart');
    if (!ctx) return;
    
    if (riskFactorsChart) {
        riskFactorsChart.destroy();
    }
    
    const currentYear = data.timeline[data.timeline.length - 1];
    const factors = [
        { name: 'Deficit Risk', value: Math.abs(currentYear.deficit) > 5 ? 80 : Math.abs(currentYear.deficit) > 3 ? 60 : 30 },
        { name: 'Debt Risk', value: currentYear.debt > 120 ? 90 : currentYear.debt > 100 ? 70 : currentYear.debt > 60 ? 50 : 20 },
        { name: 'Political Risk', value: currentYear.political < 3 ? 90 : currentYear.political < 5 ? 70 : currentYear.political < 7 ? 40 : 20 },
        { name: 'Spending Risk', value: currentYear.spending > 50 ? 80 : currentYear.spending > 45 ? 60 : 40 }
    ];
    
    riskFactorsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: factors.map(f => f.name),
            datasets: [{
                label: 'Risk Level (%)',
                data: factors.map(f => f.value),
                backgroundColor: factors.map(f => 
                    f.value >= 80 ? professionalColors[2] :
                    f.value >= 60 ? professionalColors[3] :
                    f.value >= 40 ? professionalColors[0] : professionalColors[4]
                ),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Risk Level (%)'
                    }
                }
            }
        }
    });
}

// Comparative analysis functions
function updateComparativeAnalysis() {
    updateComparativeChart();
    updateRegionalChart();
    updateCategoryRankings();
}

function updateComparativeChart() {
    const ctx = document.getElementById('comparative-chart');
    if (!ctx) return;
    
    if (comparativeChart) {
        comparativeChart.destroy();
    }
    
    const countries = Object.keys(countryData);
    
    comparativeChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Risk vs Debt',
                data: countries.map(c => {
                    const country = countryData[c];
                    const currentYear = country.timeline[country.timeline.length - 1];
                    return {
                        x: currentYear.debt,
                        y: country.risk_assessment.total_risk,
                        label: country.name
                    };
                }),
                backgroundColor: professionalColors[0],
                borderColor: professionalColors[0],
                borderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label;
                        },
                        label: function(context) {
                            return [`Debt: ${context.raw.x.toFixed(1)}% GDP`, `Risk: ${context.raw.y}%`];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Public Debt (% GDP)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Crisis Risk Score (%)'
                    }
                }
            }
        }
    });
}

function updateRegionalChart() {
    const ctx = document.getElementById('regional-chart');
    if (!ctx) return;
    
    if (regionalChart) {
        regionalChart.destroy();
    }
    
    // Group countries by region and calculate average risk
    const regionData = {};
    Object.values(countryData).forEach(country => {
        if (!regionData[country.region]) {
            regionData[country.region] = { countries: [], totalRisk: 0 };
        }
        regionData[country.region].countries.push(country);
        regionData[country.region].totalRisk += country.risk_assessment.total_risk;
    });
    
    const regions = Object.keys(regionData);
    const avgRisks = regions.map(region => 
        regionData[region].totalRisk / regionData[region].countries.length
    );
    
    regionalChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: regions,
            datasets: [{
                data: avgRisks,
                backgroundColor: professionalColors.slice(0, regions.length),
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return [`${context.label}`, `Avg Risk: ${context.parsed.toFixed(1)}%`];
                        }
                    }
                }
            }
        }
    });
}

function updateCategoryRankings() {
    const container = document.getElementById('category-rankings');
    if (!container) return;
    
    container.innerHTML = '';
    
    const categories = ['G7', 'BRICS', 'High Income', 'Lower Middle Income'];
    
    categories.forEach(category => {
        const categoryCountries = Object.values(countryData)
            .filter(c => c.categories.includes(category) || c.income_level === category)
            .sort((a, b) => b.risk_assessment.total_risk - a.risk_assessment.total_risk)
            .slice(0, 5);
        
        if (categoryCountries.length === 0) return;
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'ranking-category';
        
        categoryElement.innerHTML = `
            <div class="ranking-title">${category} Risk Ranking</div>
            <div class="ranking-list">
                ${categoryCountries.map((country, index) => `
                    <div class="ranking-item">
                        <span class="ranking-country">${index + 1}. ${country.flag} ${country.name}</span>
                        <span>${country.risk_assessment.total_risk}%</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(categoryElement);
    });
}