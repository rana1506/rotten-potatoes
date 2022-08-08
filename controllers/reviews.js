const Review = require('../models/review');
const Comment = require('../models/comment')
auth=require('../middleware/isLoggedin')

module.exports = function(app) {



// INDEX
app.get('/reviews', (req, res) => {
  const currentUser = req.user;

  Review.find().lean()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews, currentUser });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/reviews/new', auth,(req, res) => {
  const currentUser = req.user;
  res.render('reviews-new', {title: "New Review", currentUser});
})

// CREATE
app.post('/reviews', auth, (req, res) => {
  /*if (req.user)
  {*/
    Review.create(req.body).then((review) => {
      console.log(review)
      res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
      console.log(err.message)
    })
  /*}
  else {
    console.log('not looged in')
    return res.status(401); // UNAUTHORIZED
  }*/
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  const currentUser = req.user;
  // find review
  Review.findById(req.params.id).lean().then(review => {
    // fetch its comments
    Comment.find({ reviewId: req.params.id }).lean().then(comments => {
      // respond with the template with both values
      res.render('reviews-show', { review: review, comments: comments, currentUser })
    })
  }).catch((err) => {
    // catch errors
    console.log(err.message)
  });
});

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  const currentUser = req.user;
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review, title: "Edit Review", currentUser});
  }).lean()
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body).lean()
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).lean().then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

}