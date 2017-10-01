// app/routes.js
module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (Với những link đăng nhập) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // Hiển thị form login
    app.get('/login', function (req, res) {
        // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    // Xử lý thông tin khi có người thực hiện đăng nhập
    app.post('/login', passport.authenticate("local-login", {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // Hiển thị trang đăng ký
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    // Xử lý thông tin khi có người đăng ký
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
        failureRedirect: '/signup', // trở lại trang đăng ký nếu có lỗi
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // Đây là trang sẽ được bảo vệ, chỉ những người đã đăng nhập mới có thể xem được
    // Chúng ta sẽ sử dụng route middleware để kiểm tra xem người đó đã đăng nhập chưa
    // hàm isLoggedIn sẽ làm việc đó.
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // Lấy thông tin user trong session và truyền nó qua template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // yêu cầu xác thực bằng facebook
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

    // xử lý sau khi user cho phép xác thực với facebook
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        })
    );

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // yêu cầu xác thực bằng twitter
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // xử lý sau khi user cho phép xác thực với twitter
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly']}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

};

// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated())
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/');
}
