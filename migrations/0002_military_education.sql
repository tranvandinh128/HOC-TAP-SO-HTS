CREATE TABLE learning_field_membership_reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  field_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'approved', 'rejected', 'revoked')
  ),
  reviewed_by TEXT,
  review_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT,
  FOREIGN KEY (user_id, field_id)
    REFERENCES user_learning_fields(user_id, field_id) ON DELETE RESTRICT,
  FOREIGN KEY (reviewed_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_field_membership_reviews_latest
  ON learning_field_membership_reviews(user_id, field_id, created_at DESC);

CREATE UNIQUE INDEX idx_field_membership_reviews_one_pending
  ON learning_field_membership_reviews(user_id, field_id)
  WHERE status = 'pending';

CREATE TABLE military_program_metadata (
  course_id INTEGER PRIMARY KEY,
  program_type TEXT NOT NULL CHECK (
    program_type IN (
      'general',
      'political',
      'legal',
      'professional',
      'information_technology',
      'foreign_language'
    )
  ),
  objective TEXT NOT NULL,
  plan_summary TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,
  FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE TABLE military_program_instructors (
  course_id INTEGER NOT NULL,
  instructor_user_id TEXT NOT NULL,
  assigned_by TEXT NOT NULL,
  assigned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TEXT,
  PRIMARY KEY (course_id, instructor_user_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,
  FOREIGN KEY (instructor_user_id) REFERENCES profiles(id) ON DELETE RESTRICT,
  FOREIGN KEY (assigned_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE TABLE military_program_sessions (
  id TEXT PRIMARY KEY,
  course_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (
    status IN ('planned', 'completed', 'cancelled')
  ),
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (ends_at > starts_at),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,
  FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_military_program_sessions_course_time
  ON military_program_sessions(course_id, starts_at);

CREATE TABLE lesson_content_versions (
  id TEXT PRIMARY KEY,
  lesson_id INTEGER NOT NULL,
  version INTEGER NOT NULL CHECK (version > 0),
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN ('draft', 'pending_review', 'approved', 'rejected', 'archived')
  ),
  created_by TEXT NOT NULL,
  reviewed_by TEXT,
  review_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT,
  UNIQUE (lesson_id, version),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE RESTRICT,
  FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE RESTRICT,
  FOREIGN KEY (reviewed_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_lesson_content_versions_status
  ON lesson_content_versions(lesson_id, status, version DESC);

CREATE TABLE lesson_content_version_reviews (
  id TEXT PRIMARY KEY,
  lesson_content_version_id TEXT NOT NULL,
  reviewer_user_id TEXT NOT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'rejected')),
  review_note TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_content_version_id)
    REFERENCES lesson_content_versions(id) ON DELETE RESTRICT,
  FOREIGN KEY (reviewer_user_id) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_lesson_content_version_reviews_version
  ON lesson_content_version_reviews(lesson_content_version_id, created_at);

CREATE TABLE learning_resource_versions (
  id TEXT PRIMARY KEY,
  resource_id INTEGER NOT NULL,
  version INTEGER NOT NULL CHECK (version > 0),
  title TEXT NOT NULL,
  author TEXT,
  source TEXT NOT NULL,
  usage_license TEXT NOT NULL,
  storage_object_key TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (
    media_type IN (
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
  ),
  byte_size INTEGER NOT NULL CHECK (byte_size > 0),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN ('draft', 'pending_review', 'approved', 'rejected', 'archived')
  ),
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (resource_id, version),
  FOREIGN KEY (resource_id) REFERENCES learning_resources(id) ON DELETE RESTRICT,
  FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_learning_resource_versions_status
  ON learning_resource_versions(resource_id, status, version DESC);

CREATE TABLE learning_resource_version_reviews (
  id TEXT PRIMARY KEY,
  resource_version_id TEXT NOT NULL,
  reviewer_user_id TEXT NOT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'rejected')),
  review_note TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_version_id)
    REFERENCES learning_resource_versions(id) ON DELETE RESTRICT,
  FOREIGN KEY (reviewer_user_id) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_learning_resource_version_reviews_version
  ON learning_resource_version_reviews(resource_version_id, created_at);
