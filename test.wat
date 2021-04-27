(module
  (type $typeTest0 (func (param i32) (result i32)))
  (type $typeTest1 (func (param f32)))
  (import "import" "test" (memory $cow 10))
  (func $cow (type $typeTest1)
    local.get 0
    drop))