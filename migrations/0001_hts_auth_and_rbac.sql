PRAGMA foreign_keys = ON;

CREATE TABLE auth_credentials (
  user_id TEXT PRIMARY KEY,
  email_normalized TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'locked', 'suspended')),
  password_changed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE auth_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_digest TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TEXT,
  revoked_reason TEXT,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_auth_sessions_user_active
  ON auth_sessions(user_id, expires_at)
  WHERE revoked_at IS NULL;

CREATE INDEX idx_auth_sessions_expiry
  ON auth_sessions(expires_at);

CREATE TABLE auth_password_resets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_digest TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT NOT NULL,
  consumed_at TEXT,
  consumption_id TEXT UNIQUE,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE INDEX idx_auth_password_resets_user_active
  ON auth_password_resets(user_id, expires_at)
  WHERE consumed_at IS NULL;

CREATE TABLE auth_rate_limits (
  bucket_hash TEXT PRIMARY KEY,
  window_started_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  blocked_until INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_rate_limits_updated
  ON auth_rate_limits(updated_at);

CREATE TABLE hts_admin_request_reviews (
  id TEXT PRIMARY KEY,
  request_id INTEGER NOT NULL,
  reviewer_id TEXT NOT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'rejected')),
  review_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES hts_admin_requests(id) ON DELETE RESTRICT,
  FOREIGN KEY (reviewer_id) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_hts_admin_request_reviews_request
  ON hts_admin_request_reviews(request_id, created_at);

CREATE TABLE hts_role_grants (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'education_manager')),
  permission TEXT NOT NULL,
  field_id INTEGER NOT NULL,
  granted_by TEXT NOT NULL,
  granted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT,
  revoked_at TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'revoked', 'expired')),
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (field_id) REFERENCES learning_fields(id) ON DELETE RESTRICT,
  FOREIGN KEY (granted_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_hts_role_grants_user_field_active
  ON hts_role_grants(user_id, field_id, role, permission, expires_at)
  WHERE status = 'active' AND revoked_at IS NULL;

CREATE TABLE hts_auth_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  actor_user_id TEXT,
  subject_user_id TEXT,
  outcome TEXT NOT NULL CHECK (outcome IN ('success', 'failure')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (actor_user_id) REFERENCES profiles(id) ON DELETE SET NULL,
  FOREIGN KEY (subject_user_id) REFERENCES profiles(id) ON DELETE SET NULL
);

CREATE INDEX idx_hts_auth_events_subject
  ON hts_auth_events(subject_user_id, created_at);

CREATE INDEX idx_hts_auth_events_created
  ON hts_auth_events(created_at);
