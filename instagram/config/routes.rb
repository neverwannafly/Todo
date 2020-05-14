Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/posts/paginate', controller: 'posts', action: 'paginate'
  resources :posts
  root 'posts#index'
end
