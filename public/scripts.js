angular.module('myApp', [])
  .controller('myCtrl', function($scope, $http) {
    $scope.loading = true;
    $scope.error = null;

    function fetchBooks() {
      $scope.loading = true;
      $scope.error = null;
      
      $http.get('/book')
        .then(response => {
          $scope.books = response.data;
          $scope.loading = false;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
          $scope.error = 'Failed to fetch books. Please try again.';
          $scope.loading = false;
        });
    }

    // Initialize the app
    angular.element(document).ready(function() {
      console.log('Angular app initialized');
      fetchBooks();
    });

    $scope.del_book = function(book) {
      $scope.error = null;
      
      $http.delete(`/book/${book.isbn}`)
        .then(() => {
          fetchBooks();
        })
        .catch(error => {
          console.error('Error deleting book:', error);
          $scope.error = 'Failed to delete book. Please try again.';
        });
    };

    $scope.add_book = function() {
      $scope.error = null;
      
      const newBook = {
        name: $scope.Name,
        isbn: $scope.Isbn,
        author: $scope.Author,
        pages: $scope.Pages
      };

      $http.post('/book', newBook)
        .then(() => {
          fetchBooks();
          // Clear form fields
          $scope.Name = $scope.Isbn = $scope.Author = $scope.Pages = '';
        })
        .catch(error => {
          console.error('Error adding book:', error);
          $scope.error = 'Failed to add book. Please try again.';
        });
    };
  });
