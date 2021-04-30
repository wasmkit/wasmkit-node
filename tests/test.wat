(module
  ;; type section
  (type (func (param i32) (result i32)))
  ;; import section
  (import "env" "prop" (func (param f32)))
  ;; table section
  (table 0 1 anyfunc)
  ;; memory section
  ;; data section
  (memory (data "some data"))
  ;; gobal section 
  (global $t i32)
  ;; export section
  (export "e" (func 1))
  ;; start section
  (start 1)
  ;; elem section
  (elem 0 (i32.const 0) $cow)
  ;; function section
  (func $cow (type 1)
    ;; code section
    i64.const 2120391230120391123
    drop))
