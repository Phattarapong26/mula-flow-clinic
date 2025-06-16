-- =====================================
-- EXTENSIONS
-- =====================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================
-- ENUM TYPES
-- =====================================
CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'cancelled');
CREATE TYPE appointment_status_enum AS ENUM ('booked', 'completed', 'cancelled', 'no_show');
CREATE TYPE customer_note_type_enum AS ENUM ('feedback', 'internal', 'warning');
CREATE TYPE subscription_plan_enum AS ENUM ('free', 'basic', 'pro', 'enterprise');
CREATE TYPE tenant_payment_status_enum AS ENUM ('pending', 'paid', 'overdue');
CREATE TYPE entity_status_enum AS ENUM ('active', 'inactive', 'deleted');

-- Specialized ENUMs
CREATE TYPE lens_status_enum AS ENUM ('ordered', 'shipped', 'arrived', 'assembled', 'delivered');
CREATE TYPE glasses_status_enum AS ENUM ('assembling', 'ready', 'delivered');
CREATE TYPE lens_claim_status_enum AS ENUM ('pending', 'accepted', 'rejected', 'refunded');
CREATE TYPE vendor_claim_cycle_status_enum AS ENUM ('open', 'locked', 'refunded');
CREATE TYPE treatment_status_enum AS ENUM ('draft', 'in_progress', 'completed', 'cancelled');

-- =====================================
-- USER & ROLE
-- =====================================
CREATE TABLE role (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE permission (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE role_permission (
  role_id UUID REFERENCES role(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permission(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE "user" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  last_login TIMESTAMP,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- TENANT & BRANCH
-- =====================================
CREATE TABLE tenant (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subscription_plan subscription_plan_enum DEFAULT 'free',
  status entity_status_enum DEFAULT 'active',
  payment_status tenant_payment_status_enum DEFAULT 'pending',
  plan_started_at TIMESTAMP,
  plan_expires_at TIMESTAMP,
  last_payment_at TIMESTAMP,
  next_billing_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_tenant (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user"(id),
  tenant_id UUID REFERENCES tenant(id),
  role_id UUID REFERENCES role(id),
  status TEXT DEFAULT 'active',
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, tenant_id)
);

CREATE TABLE branch (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  name TEXT NOT NULL,
  address TEXT,
  province TEXT,
  status entity_status_enum DEFAULT 'active',
  is_deleted BOOLEAN DEFAULT FALSE,
  UNIQUE (tenant_id, name)
);

CREATE TABLE user_branch_assign (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user"(id),
  branch_id UUID REFERENCES branch(id),
  position TEXT,
  permission_level TEXT DEFAULT 'staff',
  UNIQUE (user_id, branch_id)
);



-- =====================================
-- CUSTOMER
-- =====================================
CREATE TABLE customer (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  name TEXT,
  phone TEXT UNIQUE,
  email TEXT NOT NULL,
  dob DATE,
  gender gender_enum,
  address TEXT,
  emergency_contact TEXT,
  medical_history TEXT,
  allergies TEXT,
  segment TEXT,
  created_by UUID REFERENCES "user"(id),
  updated_by UUID REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  UNIQUE (tenant_id, name, phone)
);

CREATE TABLE customer_note (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id) ON DELETE CASCADE,
  created_by UUID REFERENCES "user"(id),
  type customer_note_type_enum,
  content TEXT,
  sentiment_score FLOAT,
  keyword_tag TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- DOCTOR
-- =====================================
CREATE TABLE doctor (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES "user"(id),
  branch_id UUID REFERENCES branch(id),
  specialization TEXT,
  license_number TEXT,
  status entity_status_enum DEFAULT 'active',
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE doctor_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID REFERENCES doctor(id),
  branch_id UUID REFERENCES branch(id),
  day_of_week INT CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME,
  end_time TIME,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT uq_doctor_schedule_slot UNIQUE (doctor_id, day_of_week, start_time, end_time)
);

-- =====================================
-- APPOINTMENT
-- =====================================
CREATE TABLE appointment_type (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  name TEXT,
  description TEXT,
  duration_minutes INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appointment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  branch_id UUID REFERENCES branch(id),
  doctor_id UUID REFERENCES doctor(id),
  type_id UUID REFERENCES appointment_type(id),
  status appointment_status_enum DEFAULT 'booked',
  scheduled_at TIMESTAMP,
  duration_minutes INT,
  notes TEXT,
  external_ref TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- SERVICE
-- =====================================
CREATE TABLE service_category (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  name TEXT NOT NULL,
  description TEXT,
  status entity_status_enum DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE service (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES service_category(id),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2),
  duration_minutes INT,
  status entity_status_enum DEFAULT 'active',
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE product_cost (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES service(id),
  branch_id UUID REFERENCES branch(id),
  cost_price NUMERIC(12,2) NOT NULL,
  effective_date TIMESTAMP DEFAULT NOW(),
  CONSTRAINT uq_service_cost_per_branch_per_date UNIQUE (service_id, branch_id, effective_date)
);

-- =====================================
-- COURSE
-- =====================================
CREATE TABLE course_category (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  name TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE course_package (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES course_category(id),
  name TEXT,
  description TEXT,
  price NUMERIC(12,2),
  total_session INT,
  validity_days INT,
  status entity_status_enum DEFAULT 'active',
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE course_service (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES course_package(id),
  service_id UUID REFERENCES service(id),
  required_sessions INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE customer_course (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  package_id UUID REFERENCES course_package(id),
  branch_id UUID REFERENCES branch(id),
  purchased_at TIMESTAMP DEFAULT NOW(),
  start_date DATE,
  end_date DATE,
  remaining_sessions INT,
  status entity_status_enum DEFAULT 'active',
  transaction_id TEXT,
  notes TEXT,
  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- TREATMENT
-- =====================================
CREATE TABLE treatment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  service_id UUID REFERENCES service(id),
  branch_id UUID REFERENCES branch(id),
  doctor_id UUID REFERENCES doctor(id),
  treatment_date TIMESTAMP,
  notes TEXT,
  status treatment_status_enum DEFAULT 'completed',
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- PAYMENT METHOD
-- =====================================
CREATE TABLE payment_method (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  description TEXT,
  gateway_identifier TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- INVOICE
-- =====================================
CREATE TABLE invoice (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  branch_id UUID REFERENCES branch(id),
  total_amount NUMERIC(12,2),
  vat_amount NUMERIC(12,2) DEFAULT 0,
  is_vat_included BOOLEAN DEFAULT TRUE,
  payment_status payment_status_enum,
  payment_method_id UUID REFERENCES payment_method(id),
  external_ref TEXT,
  income_category TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoice_item (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoice(id) ON DELETE CASCADE,
  service_id UUID REFERENCES service(id),
  quantity INT,
  unit_price NUMERIC(12,2),
  total_price NUMERIC(12,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- EXPENSE
-- =====================================
CREATE TABLE expense (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  category TEXT,
  expense_type TEXT,
  amount NUMERIC(12,2) NOT NULL,
  paid_at TIMESTAMP DEFAULT NOW(),
  description TEXT,
  created_by UUID REFERENCES "user"(id)
);

-- =====================================
-- ASSET / LIABILITY / EQUITY
-- =====================================
CREATE TABLE asset (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  name TEXT,
  value NUMERIC(12,2),
  acquired_at TIMESTAMP,
  status entity_status_enum DEFAULT 'active'
);

CREATE TABLE liability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  name TEXT,
  value NUMERIC(12,2),
  due_date DATE,
  status entity_status_enum DEFAULT 'active'
);

CREATE TABLE equity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  value NUMERIC(12,2),
  source TEXT,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- PURCHASE INVOICE
-- =====================================
CREATE TABLE purchase_invoice (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_name TEXT,
  amount NUMERIC(12,2),
  vat NUMERIC(12,2),
  total NUMERIC(12,2),
  paid_at TIMESTAMP,
  branch_id UUID REFERENCES branch(id),
  external_ref TEXT,
  created_by UUID REFERENCES "user"(id)
);

-- =====================================
-- EMPLOYEE SALARY
-- =====================================
CREATE TABLE employee_salary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user"(id),
  base_salary NUMERIC(12,2) NOT NULL,
  bonus NUMERIC(12,2) DEFAULT 0,
  payroll_date DATE NOT NULL,
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- OWNER WITHDRAW
-- =====================================
CREATE TABLE owner_withdrawal (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES "user"(id),
  amount NUMERIC(12,2) NOT NULL,
  type TEXT CHECK (type IN ('salary', 'personal', 'advance')) DEFAULT 'personal',
  reason TEXT,
  withdrawn_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- WITHHOLDING TAX (WHT)
-- =====================================
CREATE TABLE withholding_tax (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payer_id UUID REFERENCES "user"(id),
  payee_name TEXT,
  amount NUMERIC(12,2),
  tax_percent FLOAT,
  tax_amount NUMERIC(12,2) GENERATED ALWAYS AS (amount * tax_percent / 100) STORED,
  payment_date DATE,
  document_ref TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- INVOICE FOLLOW UP (ทวงหนี้)
-- =====================================
CREATE TABLE invoice_follow_up (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoice(id) ON DELETE CASCADE,
  follow_up_date DATE NOT NULL,
  result TEXT,
  note TEXT,
  staff_id UUID REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- CASH SNAPSHOT (สำหรับงบดุล / cashflow / runway)
-- =====================================
CREATE TABLE cash_snapshot (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  date DATE NOT NULL,
  cash_on_hand NUMERIC(12,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
-- =====================================
-- KPI Snapshot (weekly)
-- =====================================
CREATE TABLE kpi_snapshot (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  week_start DATE,
  revenue NUMERIC(12,2),
  cost NUMERIC(12,2),
  utilization_percent FLOAT,
  no_show_percent FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- Branch Slot Template
-- =====================================
CREATE TABLE branch_slot_template (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branch(id),
  day_of_week INT CHECK (day_of_week BETWEEN 0 AND 6),
  total_slot INT NOT NULL
);

-- =====================================
-- Staff Attendance Log
-- =====================================
CREATE TABLE staff_attendance_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user"(id),
  branch_id UUID REFERENCES branch(id),
  date DATE,
  type TEXT CHECK (type IN ('absent', 'leave', 'ot')),
  hours FLOAT,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- CRM : Follow-up + Task Assign + Campaign
-- =====================================
CREATE TABLE follow_up_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  method TEXT,
  staff_id UUID REFERENCES "user"(id),
  result TEXT,
  note TEXT,
  next_follow_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE crm_task_assign (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  assigned_to UUID REFERENCES "user"(id),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('open', 'in_progress', 'done')) DEFAULT 'open',
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE campaign_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  campaign_name TEXT,
  sent_at TIMESTAMP DEFAULT NOW(),
  channel TEXT,
  result TEXT
);

-- =====================================
-- Chat Integration Config
-- =====================================
CREATE TABLE chat_integration_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  platform TEXT CHECK (platform IN ('facebook', 'line', 'line_ai_bot')),
  channel_id TEXT,
  access_token TEXT,
  secret_key TEXT,
  webhook_url TEXT,
  config_json JSONB,
  active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  platform TEXT,
  sender TEXT,
  receiver TEXT,
  message TEXT,
  is_bot BOOLEAN,
  is_fallback BOOLEAN,
  received_at TIMESTAMP,
  responded_at TIMESTAMP,
  response_time_secs INT
);
-- =====================================
-- Lens Unit (แยกเลนส์ซ้ายขวาตามค่าสายตา)
-- =====================================
-- =====================================
-- BUSINESS LOAN
-- =====================================
CREATE TABLE business_loan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  lender_name TEXT NOT NULL,
  loan_amount NUMERIC(12,2) NOT NULL,
  interest_rate FLOAT DEFAULT 0,
  start_date DATE,
  due_date DATE,
  status TEXT CHECK (status IN ('active', 'paid', 'default')) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lens_unit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  invoice_item_id UUID REFERENCES invoice_item(id),
  prescription_left TEXT,
  prescription_right TEXT,
  lens_model TEXT,
  order_type TEXT CHECK (order_type IN ('normal', 'claim')) DEFAULT 'normal',
  vendor_name TEXT,
  current_status lens_status_enum DEFAULT 'ordered',
  expected_arrival DATE,
  arrived_at TIMESTAMP,
  assembled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- Glasses Unit (แว่นแต่ละอันประกอบจากกรอบ + เลนส์ซ้าย/ขวา)
-- =====================================
CREATE TABLE glasses_unit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customer(id),
  branch_id UUID REFERENCES branch(id),
  frame_product_id UUID REFERENCES service(id),
  lens_left_id UUID REFERENCES lens_unit(id),
  lens_right_id UUID REFERENCES lens_unit(id),
  status glasses_status_enum DEFAULT 'assembling',
  assembled_at TIMESTAMP,
  delivered_at TIMESTAMP,
  notified_at TIMESTAMP,
  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- Lens Claim Request
-- =====================================
CREATE TABLE lens_claim_request (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  lens_unit_id UUID REFERENCES lens_unit(id),
  customer_id UUID REFERENCES customer(id),
  reason TEXT,
  claim_date DATE DEFAULT CURRENT_DATE,
  refund_amount NUMERIC(12,2),
  vendor_response TEXT,
  status lens_claim_status_enum DEFAULT 'pending',
  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- Vendor Claim Cycle (รอบที่ Vendor คืนเงิน)
-- =====================================
CREATE TABLE vendor_claim_cycle (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  vendor_name TEXT,
  cycle_code TEXT, -- e.g. '2024-W27'
  start_date DATE,
  end_date DATE,
  total_claim_amount NUMERIC(12,2),
  status vendor_claim_cycle_status_enum DEFAULT 'open',
  refund_expected_date DATE,
  refund_received_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- Recurring Expense (ค่าใช้จ่ายประจำ)
-- =====================================
CREATE TABLE expense_recurring (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  branch_id UUID REFERENCES branch(id),
  name TEXT,
  amount NUMERIC(12,2),
  due_day INT CHECK (due_day BETWEEN 1 AND 31),
  category TEXT,
  auto_notify BOOLEAN DEFAULT TRUE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================
-- Loan Schedule (กำหนดรอบชำระ)
-- =====================================
CREATE TABLE loan_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loan_id UUID REFERENCES business_loan(id),
  due_date DATE,
  principal NUMERIC(12,2),
  interest NUMERIC(12,2),
  total_payment NUMERIC(12,2) GENERATED ALWAYS AS (principal + interest) STORED,
  paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE OR REPLACE VIEW balance_sheet_summary AS
SELECT
  t.id AS tenant_id,
  COALESCE(SUM(a.value), 0) AS total_assets,
  COALESCE(SUM(l.value), 0) AS total_liabilities,
  COALESCE(SUM(e.total_equity), 0) AS total_equity
FROM tenant t
LEFT JOIN asset a ON a.tenant_id = t.id
LEFT JOIN liability l ON l.tenant_id = t.id
LEFT JOIN (
  SELECT tenant_id, SUM(value) AS total_equity
  FROM equity
  GROUP BY tenant_id
) e ON e.tenant_id = t.id
GROUP BY t.id;
CREATE TABLE ai_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user"(id),
  prompt TEXT,
  gpt_response TEXT,
  module TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user"(id),
  action TEXT,
  module TEXT,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
   CREATE TABLE onboarding_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  step TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tenant_config_flag (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenant(id),
  flag TEXT,
  value BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_customer_phone ON customer(phone);
CREATE INDEX idx_invoice_customer ON invoice(customer_id);
CREATE INDEX idx_invoice_branch ON invoice(branch_id);
CREATE INDEX idx_appointment_schedule ON appointment(scheduled_at);
CREATE INDEX idx_service_status ON service(status);
CREATE INDEX idx_doctor_schedule_day ON doctor_schedule(doctor_id, day_of_week);
CREATE INDEX idx_customer_course_branch ON customer_course(branch_id);
CREATE INDEX idx_treatment_date ON treatment(treatment_date);
CREATE INDEX idx_customer_email ON customer(email);
CREATE INDEX idx_chat_log_branch ON chat_log(branch_id);
CREATE INDEX idx_cash_snapshot_date ON cash_snapshot(date);
CREATE INDEX idx_expense_paid ON expense(paid_at);
