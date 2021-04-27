(module
  (type $typeTest0 (func (param i32) (result i32)))
  (type $typeTest1 (func (param f32)))
  (import "import" "test" (memory $cow 10))
  (table 20 funcref)
  (func $cow (type $typeTest1)
    local.get 0
    drop))