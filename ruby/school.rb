
class School
    attr_accessor :name,
                  :address,
                  :number_of_students,
                  :founding_years,
                  :introduction_video_url,
                  :introduction_statement
  
    def initialize(name, address, number_of_students,founding_years,
                   introduction_video_url, introduction_statement)
      @name = name
      @address = address
      @number_of_students = number_of_students
      @founding_years = founding_years
      @introduction_video_url = introduction_video_url
      @introduction_statement = introduction_statement
    end
  
    ### 学校紹介動画ページを表示するインスタンスメソッドを定義
    def get_video
        require "launchy"
        Launchy.open(@introduction_video_url) 
    end
  end
  
  
  
  a_school = School.new("A学校", "東京都新宿区..", 300, 100, "https://www.youtube.com/?gl=JP&hl=ja", "A学校は自然豊かな...")
  # 以下でインスタンスメソッドを呼び出そう
  a_school.get_video
  b_school = School.new("B学校", "東京都新宿区..", 500, 30, "https://qiita.com/prgseek/items/c0fc2ffc8e1736348486", "B学校は文武両立で...")
  # 以下でインスタンスメソッドを呼び出そう
  b_school.get_video

=begin
class School
    attr_accessor :name, :address
    def initialize(name, address)
        @name = name
        @address = address
    end

    def sample_instance_method
        puts "#{@name}だよ"
    end
end


a_school = School.new(name = "A学校", address = "渋谷")
#a_school.name = "A"
puts(a_school.name)

b_school = School.new(name = "B学校", address = "池袋")
#b_school.name = "B"
puts(b_school.name)

puts(a_school.address)
puts(a_school.instance_variables)
puts(a_school.sample_instance_method())
=begin
a_school = School.new
b_school = School.new

    attr_accessor :name, :address


    def name(word)
        @school_name = word
    end

    def name1
        puts @school_name
    end



=end


