const tableData = data
const filters = {}
const dateSelect = d3.select("#datetime")
const citySelect = d3.select("#city")
const stateSelect = d3.select("#state")
const countrySelect = d3.select("#country")
const shapeSelect = d3.select("#shape")




function buildTable(data) {
    const tbody = d3.select("tbody")
    tbody.html("")

    data.forEach(row => {
        const currentRow = tbody.append("tr") 
        Object.values(row).forEach(value => {
            const cell = currentRow.append("td")
            cell.text(value)
        })
    })
}

function getOptions(key, select) {
    let arrayValues = tableData.map(e => e[key]).filter(function(value, index, self){
        return index == self.indexOf(value)
    })
    if (key != "datetime"){
        arrayValues.sort()
    }
    arrayValues.forEach(sv => {
        const selectOption = select.append("option")
        selectOption.text(sv.toUpperCase())
    })
}

function updateFilters() {
    
    const changedElement = d3.select(this).select("select");
    const elementValue = changedElement.property("value");
    const filterId = changedElement.attr("id");

    elementValue ? filters[filterId] = elementValue : delete filters[filterId]
    filterTable()
}

function filterTable() {
    let filteredData = tableData

    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value)
    })

    buildTable(filteredData)
}

function resetFilters() {
    Object.entries(filters).forEach(([key, value]) => {
        delete filters[key]
    filterTable()
    d3.selectAll("select").property("value","")
    })
}

d3.select("#reset-btn").on("click", resetFilters)
d3.selectAll(".filter").on("change", updateFilters)
getOptions("datetime",dateSelect)
getOptions("city",citySelect)
getOptions("state",stateSelect)
getOptions("country",countrySelect)
getOptions("shape",shapeSelect)
buildTable(tableData)