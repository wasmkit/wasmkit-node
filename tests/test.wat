(module
  ;; type section
  (type (func (param $cow i32) (result i32)))
  ;; import section
  (import "env" "prop" (func $a (type 0)))
  (import "env" "propz" (table $t1 0 1 funcref))
  ;; table section
  (table 0 1 funcref)
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
  (func $cow (type 0) (param $cow i32) (result i32)
    ;; code section
    call $a
    drop
    call $cow
    drop
    i64.const 2120391230120391123
    drop))
