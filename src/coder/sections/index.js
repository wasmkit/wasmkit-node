// Decided to seperate into files for easy accessibility

module.exports = {
    TypeSection: require('./type'),
    ImportSection: require('./import'),
    FunctionSection: require('./function'),
    TableSection: require('./table'),
    LinearMemorySection: require('./memory'),
    GlobalSection: require('./global'),
    ExportSection: require('./export'),
    StartSection: require('./start'),
    ElementSection: require('./element'),
    CodeSection: require('./code'),
    DataSection: require('./data')
};