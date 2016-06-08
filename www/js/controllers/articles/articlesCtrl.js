'use strict';
/**
 * controller  - social articles
 */
app.controller('ArticlesCtrl', function($scope, $rootScope, $http, userFactory, APP_REGEX, $localstorage, $state, $stateParams, $ionicPopup){
  console.log('I am a articlesCtrl');

  //user data articles
  var user={
    "articles":[
      {"_id":"1","desc": "ספרו של אלחנדרו סמברה, שעוסק בילדות ובהתבגרות בצל משטרו של פינושה בצ'ילה, חושף דרך נימים עדינים של כתיבה את חדירתה של הדיקטטורה אל כל פינה בנפש. בכתיבה מלאת חמלה, הוא מוכיח כי גם מבעד למשטר חובק-כל עולה וצומח העולם הפנימי שאיש לא יכול לרמוס. ביקורת", "headerTitle": "\"דרכים לחזור הביתה\": נצחון האישי על הפוליטי","Img":"../img/articles/ynet.jpg"},
      {"_id":"2","headerTitle": "הכול אודות לחץ", "desc": "המונח לחץ מתאר שיבוש או שינוי כלשהו בחיינו (גופני, רגשי או נפשי). השתמש בו לראשונה האנס סליי, שהעיר בחכמה: \"ללא לחץ לא היו חיים\". זו נקודה חשובה. רבים מאתנו מזהים לחץ עם רגשות שליליים, כגון דאגות הקשורות במקום העבודה (למשל, סופר המנסה לעמוד בלוח הזמנים להוצאת ספר, הפחד מפני פיטורין וכדומה), או מצבים רגשיים שליליים הנובעים מבעיות בקשרים חברתיים. דאגה, חרדה, פחד, כעס, דיכאון – אלה הרגשות שאנחנו בדרך כלל קושרים עם לחץ.","Img":"../img/articles/seret.png"},
      {"_id":"3","desc": "אחרי שאושרה הצעתה של מירי רגב לבטל את חוק הספרים בוועדת השרים לחקיקה, פרסמה ועדת החינוך של הכנסת את המלצתה ההפוכה: דחיית ביטול חוק הספרים עד לאחרי שבוע הספר. במקביל, נחשפו מסקנות הוועדה שמינתה שרת התרבות לבדיקת כדאיות החוק, והן אינן חד משמעיות", "headerTitle": "חוק הספרים: הביטול יידחה לאחרי שבוע הספר","Img":"../img/articles/ynet.jpg"},
      {"_id":"4","headerTitle": "תזונה נכונה לפני אימון ", "desc": "המזון שתבחרו לאכול לפני האימון, כמותו ועיתוי האכילה ישפיעו על הביצועים, הכוח והסבולת שלכם. באופן פרדוקסאלי, צריכת פחמימות מגבירה את שריפת הפחמימות בתאי השריר אך מעכבת את העייפות. מחקרים רבים הגיעו למסקנה כי צריכת פחמימות לפני פעילות גופנית מובילה לביצועים משופרים בהשוואה לפעילות גופנית שמתבצעת על קיבה ריקה.","Img":"../img/articles/seret.png"}
    ]
  }

  ////Start-articles

  $scope.heartPressed = false;
  $scope.articles=null;

  $scope.passToArticle=function(art){
    console.log("gotoArticle");
    if(!art || art._id == ''){
      return;
    }
    console.log(art);
    $state.go('article', {obj: art},{reload: true, notify:true});
  }

  //here get the data from the dataBase,user-article.
  var getArticles=function(){
    $scope.articles=user.articles;
    console.log("userArticles",$scope.articles);

  }

  //function that update his favorites.
function updateFavoriteArticle(art){
    ///sending article id .
    console.log("you just update favorites",art._id)
  }

  //User add article to his favorites
  $scope.favoritesBtn = function(art){
    $scope.heartPressed = !$scope.heartPressed;
    art.favorit = !art.favorit;
    updateFavoriteArticle(art);

  };


  function init(){
    getArticles();
  }
  init()
  ////End-articles



});
