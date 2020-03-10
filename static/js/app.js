const tableData = data
const filters = {}
const dateSelect = d3.select("#datetime")
const citySelect = d3.select("#city")



function buildTable(data) {
    const tbody = d3.select('tbody')
    tbody.html('')

    data.forEach(row => {
        const currentRow = tbody.append('tr') 
        Object.values(row).forEach(value => {
            const cell = currentRow.append('td')
            cell.text(value)
        })
    })
}

function getOptions(key, select) {
    let arrayValues = tableData.map(e => e[key]).filter(function(value, index, self){
        return index == self.indexOf(value)
    })
    arrayValues.forEach(sv => {
        const selectOption = select.append("option")
        selectOption.text(sv)
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
    console.log("entered filter table function")
    console.log(filters)
    let filteredData = tableData

    Object.entries(filters).forEach(([key, value]) => {
        console.log(key)
        console.log(value)
        filteredData = filteredData.filter(row => row[key] === value)
        
    })

    buildTable(filteredData)
}


d3.selectAll('.filter').on('change', updateFilters)
getOptions("datetime",dateSelect)
getOptions("city",citySelect)
//buildTable()