const tableData = data
const tbody = d3.select('tbody')
const dateSelect = d3.select("#dateselector")
const datesArray = tableData.map(e => e.datetime)
const citySelect = d3.select("#cityselector")
const citiesArray = tableData.map(e => e.city)

function buildTable(data) {
    tbody.html('')  // Clear existing data

    data.forEach(row => {
        const currentRow = tbody.append('tr')  // append row
        Object.values(row).forEach(value => {
            const cell = currentRow.append('td')
            cell.text(value)
        })
    })
}

function getOptions(key, select) {
    let arrayValues = key.filter(function(value, index, self){
        return index == self.indexOf(value)
    })
    arrayValues.forEach(sv => {
        const selectOption = select.append("option")
        selectOption.text(sv)
    })
}

const handleClick = () => {
    d3.event.preventDefault()

    // const date = d3.select('#datetime').property('value')
    const date = dateSelect.property("value")
    let filteredData = tableData;

    if (date)
        filteredData = filteredData.filter(row => row.datetime === date)
    buildTable(filteredData)
}

d3.selectAll('#filter-btn').on('click', handleClick)
dateSelect.on("change", handleClick)
// buildTable(tableData)
buildTable(tableData)
getOptions(datesArray,dateSelect)
getOptions(citiesArray,citySelect)