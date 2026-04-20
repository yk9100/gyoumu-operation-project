// 表单配置类型定义

// 表单字段类型
export type FormFieldType = 'text' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea';

// 表单字段选项
export interface FormFieldOption {
  label: string;
  value: string | number | boolean;
}

// 表单字段配置
export interface FormField {
  key: string;           // 字段唯一标识
  label: string;         // 字段标签
  type: FormFieldType;   // 字段类型
  value?: any;           // 字段值
  required?: boolean;    // 是否必填
  placeholder?: string;  // 占位符
  options?: FormFieldOption[]; // 下拉选择或单选框选项
  tip?: string;          // 自定义提示信息
  disabled?: boolean;    // 是否禁用
  rules?: any[];         // 验证规则
  tipLink?: string;
}

// 表单配置
export interface FormConfig {
  fields: FormField[];
  layout?: 'horizontal' | 'vertical';
  labelWidth?: string;
}
