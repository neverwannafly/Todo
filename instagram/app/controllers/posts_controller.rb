class PostsController < ApplicationController
  before_action :set_controller, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.order(created_at: :desc)
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new post_params
    @post.user = current_user

    if @post.save
      respond_to do |format|
        format.html { redirect_to posts_url, notice: "Posted successfully." }
      end
    else
      respond_to do |format|
        format.html { redirect_to posts_url, notice: "Post Failed!." }
      end
    end
  end

  def show
  end

  def edit
  end

  # Page numbers should start from 1
  def paginate
    page_num = params[:page_num].to_i - 1
    items_per_page = params[:items_per_page].to_i
    @post = Post.order(created_at: :desc).offset(page_num*items_per_page).limit(items_per_page)
    render json: @post
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to posts_url, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully deleted.' }
      format.json { head :no_content }
    end
  end

private
  def post_params
    params.require(:post).permit(:image, :caption)
  end

  def set_controller
    if current_user
      @user = User.find(session[:user_id])
      @post = Post.find(params[:id])
    else
      redirect_to login_url
    end
  end

end
