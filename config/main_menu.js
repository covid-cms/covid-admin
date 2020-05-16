export default [
  {
    id: 'dashboard',
    title: 'Tổng quan',
    routeTo: '/',
    icon: 'fas fa-tachometer-alt',
    childs: []
  },
  {
    id: 'blog',
    title: 'Blog',
    routeTo: '/blog/articles',
    icon: 'fas fa-th',
    childs: [
      {
        id: 'article',
        title: 'Bài viết',
        routeTo: '/blog/articles'
      },
      {
        id: 'create-article',
        title: 'Thêm bài viết',
        routeTo: '/blog/articles/create'
      },
      {
        id: 'category',
        title: 'Danh mục',
        routeTo: '/blog/categories',
      },
      {
        id: 'tag',
        title: 'Tags',
        routeTo: '/blog/tags',
      },
    ]
  }
]
