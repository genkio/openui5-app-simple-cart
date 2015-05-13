require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/app'

get '/' do
  html :index
end

def html(view)
  File.read("app/#{view.to_s}.html")
end