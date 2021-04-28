module.exports = {};

module.exports.SECTIONS = {
    0x0: "CustomSection",
    0x1: "TypeSection",
    0x2: "ImportSection",
    0x3: "FunctionSection",
    0x4: "TableSection",
    0x5: "LinearMemorySection",
    0x6: "GlobalSection",
    0x7: "ExportSection",
    0x8: "StartSection",
    0x9: "ElementSection",
    0xA: "CodeSection",
    0xB: "DataSection",
}

module.exports.TYPE_ENC = {
    "0": "void",
    "-1": "i32",
    "-2": "i64",
    "-3": "f32",
    "-4": "f64",
    "-16": "funcref",
    "-32": "func",
    "-40": "void"
}

module.exports.EXTERNAL_KIND = [
    "func",
    "table",
    "memory",
    "global"
]

module.exports.TABLE_ELEM_TYPES = [
    "funcref"
]