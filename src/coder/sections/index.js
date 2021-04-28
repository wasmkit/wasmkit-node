// const SECTIONS = {
//     0x1: "TypeSection",
//     0x2: "ImportSection",
//     0x3: "FunctionSection",
//     0x4: "TableSection",
//     0x5: "LinearMemorySection",
//     0x6: "GlobalSection",
//     0x7: "ExportSection",
//     0x8: "StartSection",
//     0x9: "ElementSection",
//     0xA: "CodeSection",
//     0xB: "DataSection",
// }


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
    CodeSection: require('./code')
};