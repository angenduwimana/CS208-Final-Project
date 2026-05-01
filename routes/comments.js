const express = require('express');
const router = express.Router();

function sanitizeText(text) {
  return text.trim().replace(/[<>]/g, '');
}

function loadCommentsPage(req, res, error = null) {
  const sql = `
    SELECT id, name, comment, created_at
    FROM comments
    ORDER BY created_at DESC
  `;

  req.db.query(sql, (err, results) => {
    if (err) {
      console.error('Select error:', err);
      return res.status(500).render('comments', {
        title: 'Customer Comments | Downtown Donuts',
        comments: [],
        error: 'We could not load comments right now.'
      });
    }

    res.render('comments', {
      title: 'Customer Comments | Downtown Donuts',
      comments: results,
      error
    });
  });
}

router.get('/comments', (req, res) => {
  loadCommentsPage(req, res);
});

router.post('/comments', (req, res) => {
  const name = sanitizeText(req.body.name || '');
  const comment = sanitizeText(req.body.comment || '');

  if (!name || !comment) {
    return loadCommentsPage(req, res, 'Please enter both a name and a comment.');
  }

  if (name.length > 50 || comment.length > 500) {
    return loadCommentsPage(
      req,
      res,
      'Name must be 50 characters or fewer and comment must be 500 characters or fewer.'
    );
  }

  const insertSql = 'INSERT INTO comments (name, comment) VALUES (?, ?)';

  req.db.query(insertSql, [name, comment], err => {
    if (err) {
      console.error('Insert error:', err);
      return loadCommentsPage(req, res, 'We could not save your comment right now.');
    }

    res.redirect('/comments');
  });
});

module.exports = router;
