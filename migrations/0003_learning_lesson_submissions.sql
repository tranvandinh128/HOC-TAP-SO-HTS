CREATE TABLE lesson_submissions (
  id TEXT PRIMARY KEY,
  lesson_id INTEGER NOT NULL,
  submitted_by TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN ('draft', 'submitted', 'reviewed', 'revision_requested')
  ),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE RESTRICT,
  FOREIGN KEY (submitted_by) REFERENCES profiles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_lesson_submissions_learner
  ON lesson_submissions(lesson_id, submitted_by, created_at DESC);

CREATE TABLE lesson_submission_files (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  storage_object_key TEXT NOT NULL UNIQUE,
  original_filename TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (
    media_type IN (
      'video/mp4',
      'video/webm',
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp'
    )
  ),
  byte_size INTEGER NOT NULL CHECK (byte_size > 0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submission_id)
    REFERENCES lesson_submissions(id) ON DELETE RESTRICT
);

CREATE INDEX idx_lesson_submission_files_submission
  ON lesson_submission_files(submission_id, created_at);
