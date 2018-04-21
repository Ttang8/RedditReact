# Iso100

[Iso100 Live][iso100]


Iso100 is a full-stack, single-page, web application. Inspired by [Flickr][flickr], Iso100 allows users to organize and share their photos with the community.

This project was blueprinted and created with a 10day deadline using Ruby on Rails, React/Redux, and PostgreSQL.

## Technology

Iso100 was built on Rails 5.1 which is a back-end MVC framework. It was used for data handling and storage in conjunction with PostgreSQL, and utilizing RESTful web services.

React was used in the front-end for its reusable modular code along with Redux to provide a unidirectional data flow.

All images are hosted using [Cloudinary][cloudinary]

## Features & Implementation

- Secure front-end and back-end user authentication
- Ability to upload pictures into user photostream and delete.
- Photo organization with albums.
- Interact with the community with comments on photos.
- Add tags to associate photos with others.
- Click tags to see similar photos.
- Explore what other users are posting in an index page.

### Single Page Application

Iso100 uses [React Router][reactrouter] to implement single all components on a single root page.

```html
// root.jsx
<Provider store={ store }>
  <HashRouter>
    <App/>
  </HashRouter>
</Provider>

// app.jsx
<div>
  <div className="navbar">
  <NavBarContainer />
  </div>

  <Route exact path="/" component={HomeContainer} />
  <ProtectedRoute path="/photos/:photoId" component={PhotoDetailViewContainer} />
  <ProtectedRoute path="/photo-upload/:userId/" component={PhotoUploadFormContainer} />
  <ProtectedRoute path="/userpage/:userId" component={UserPageContainer} />

  <AuthRoute path="/login" component={SessionFormContainer}/>
  <AuthRoute path="/signup" component={SessionFormContainer}/>
  <FootBar />
</div>
```

### Photos

Users have access to explore photos from others as well as uploading their own. They are able to add titles and descriptions to their photos as well as delete them. Users can go their userpage photostream to see all the photos they have uploaded as well as going to the index page to see all community photos that other fellow users upload.

![index_page: index][indexpage]

### Masonry

Photos are displayed with [Masonry] which adjust and resizes photos to fit in gird.

```html
//home.jsx
<div className="main-page-photo-container-div">
  <Masonry
    className={'masonry-home-page'}
    elementType={'ul'}
    options={masonryOptions}>
    {photoList}
  </Masonry>
</div>
```

### Albums

Users are able to create custom albums from their userpage. They are able to organize their photos as well as add titles and descriptions to their albums. Albums contain a photo index that contain their chosen photos. Photos are added to albums through the photo show page.

![albums: albums][albums]

![albumscreate: albumscreate][albumscreate]

### Comments

Users are able to click on any photo and be brought to a photo show page. Here users can add comments to photos as well as delete their own comments.

![comments: comments][comments]

### Tags & Searching

Users can add custom tags to their photos in the photo show page which allows a others to easily search for similar photos with a click of a button.

![tags: tags][tags]

### User Profiles

Users profiles have access to their photostreams and albums where they can organize and see all their upload content.

![user_page: https://iso100.herokuapp.com/#/][userpage]


## Future Implementations

### Infinite Scrolling

Being able to implement an infinite scroll will benefit user experience as load times will be faster.

### Search Bar with Live Results

Users can search for photo titles, users and tags with live results populating the page.

[iso100]:https://iso100.herokuapp.com/#/
[flickr]:https://www.flickr.com/
[cloudinary]:http://cloudinary.com/
[reactrouter]:https://github.com/ReactTraining/react-router
[masonry]:https://github.com/eiriklv/react-masonry-component
[userpage]: ./docs/images/user_page.png
[indexpage]: ./docs/images/index.png
[albums]: ./docs/images/albums.png
[albumscreate]: ./docs/images/album_create.png
[comments]:./docs/images/comments.png
[tags]:./docs/images/tags.png
