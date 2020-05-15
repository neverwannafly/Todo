Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/signup', controller:'users', action:'new'
  post '/users', controller:'users', action:'create'
  get '/login', controller:'sessions', action:'new'
  post '/login', controller:'sessions', action:'create'
  get '/logout', controller:'sessions', action:'destroy'
  get '/posts/paginate', controller: 'posts', action: 'paginate'
  resources :posts
  root 'posts#index'
end
