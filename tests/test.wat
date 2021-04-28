(module
  (import "foo" "bar" (func (param f32)))
  (memory (data "hi"))
  (type (func (param i32) (result i32)))
  (start 1)
  (table 0 1 anyfunc)
  (elem 0 (i32.const 0))
  (func)
  (func (type 1)
    (local $HowDoYouDo i32)
    i32.const 42
    drop)
  (export "TEST" (func 1)))
