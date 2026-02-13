import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Star, 
  Crown, 
  Camera, 
  Sparkles, 
  MapPin, 
  Phone, 
  Instagram, 
  Menu,
  X,
  CheckCircle2,
  Heart,
  Users,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.age) {
      toast.error('Будь ласка, заповніть всі поля');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mwvnlrnq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          age: formData.age,
          _replyto: 'ksenjaboyko@gmail.com',
          email: 'ksenjaboyko@gmail.com'
        }),
      });

      if (response.ok) {
        toast.success('Дякуємо! Ми зв\'яжемося з вами найближчим часом');
        setFormData({ name: '', phone: '', age: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error('Помилка відправки. Спробуйте ще раз або зателефонуйте нам');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const benefits = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: 'Постановка ходи',
      description: 'Навчимо граціозно та впевнено рухатися по подіуму'
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Фото-позиція',
      description: 'Освоїмо професійні пози для фотосесій'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Акторська майстерність',
      description: 'Розкриємо талант та розвинемо харизму'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Самовпевненість',
      description: 'Допоможемо подолати сором\'язливість'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Етикет та манери',
      description: 'Виховаємо справжню леді та джентльмена'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Участь у показах',
      description: 'Можливість виходу на справжній подіум'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Crown className="w-8 h-8 text-lavender" />
              <span className="text-xl font-bold tracking-tight top-logo">
                HILLARY <span className="text-lavender">MODELS</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 top-menu">
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-lavender transition-colors">
                Про нас
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-sm font-medium hover:text-lavender transition-colors">
                Переваги
              </button>
              <button onClick={() => scrollToSection('trial')} className="text-sm font-medium hover:text-lavender transition-colors">
                Пробне заняття
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-lavender transition-colors">
                Контакти
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 mb-mb"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-effect border-t">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 font-medium">
                Про нас
              </button>
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left py-2 font-medium">
                Переваги
              </button>
              <button onClick={() => scrollToSection('trial')} className="block w-full text-left py-2 font-medium">
                Пробне заняття
              </button>
              <button onClick={() => scrollToSection('contacts')} className="block w-full text-left py-2 font-medium">
                Контакти
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image - original with fade edges */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div 
            className="relative h-full w-full max-w-3xl"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          >
            <img 
              src="/IMG_8011.JPEG" 
              alt="Hillary Models" 
              className="h-full w-full object-contain object-right"
            />
          </div>
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-teal rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-lavender rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-teal rounded-full animate-pulse delay-500" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Star className="w-4 h-4 text-lavender" />
            <span className="text-sm text-white/90">Дитяча модельна школа у Києві</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            HILLARY <span className="text-gradient">MODELS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-2xl mx-auto font-light">
            Розкриваємо таланти, виховуємо зірок
          </p>
          
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
            Професійна підготовка юних моделей від 4 до 16 років
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('trial')}
              className="bg-gradient-lavender-teal text-black font-semibold px-8 py-6 text-lg rounded-full hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Записатись на пробне заняття
            </Button>
            <Button 
              onClick={() => scrollToSection('about')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full button-more"
            >
              Дізнатись більше
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/10 mb-6">
                <Crown className="w-4 h-4 text-lavender" />
                <span className="text-sm font-medium text-lavender-dark">Про нашу школу</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Де народжуються <span className="text-gradient">зірки</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Hillary Models — це простір, де кожна дитина може відкрити свій потенціал та розвинути 
                природну харизму. Наша місія — виховувати впевнених, граціозних та успішних особистостей.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Ми пропонуємо комплексну програму навчання, яка включає постановку ходи, 
                фото-позування, акторську майстерність та розвиток особистісних якостей.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-lavender mb-1">10+</div>
                  <div className="text-sm text-gray-500">Років досвіду</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal mb-1">500+</div>
                  <div className="text-sm text-gray-500">Випускників</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-lavender mb-1">50+</div>
                  <div className="text-sm text-gray-500">Показів</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-lavender/20 to-teal/20 imbg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Crown className="w-24 h-24 text-lavender mx-auto mb-6" />
                    <p className="text-2xl font-bold text-white mb-2">Hillary Models</p>
                    <p className="text-gray-100">Створюємо майбутнє модельного бізнесу</p>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-lavender" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Топ-школа</p>
                    <p className="text-sm text-gray-500">Київ 2026</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">100% задоволення</p>
                    <p className="text-sm text-gray-500">Батьків та дітей</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 mb-6">
              <Sparkles className="w-4 h-4 text-teal" />
              <span className="text-sm font-medium text-teal-dark">Чому обирають нас</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Що отримає ваша <span className="text-gradient">дитина</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Наша програма розроблена професіоналами модельного бізнесу для всебічного розвитку юних талантів
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender/20 to-teal/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-lavender-dark">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Lesson Section */}
      <section id="trial" className="py-24 bg-black relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-lavender opacity-10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal opacity-10 blur-3xl rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-teal" />
                <span className="text-sm text-white/90">Безкоштовно</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Перше пробне <span className="text-gradient">заняття</span>
              </h2>
              
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Запишіться на безкоштовне пробне заняття прямо зараз! Ми познайомимо вашу дитину 
                зі світом моделінгу, проведемо пробний урок та відповімо на всі ваші запитання.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-lavender" />
                  </div>
                  <span className="text-white/80">Безкоштовна консультація</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-lavender" />
                  </div>
                  <span className="text-white/80">Пробний урок з постановки ходи</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-lavender" />
                  </div>
                  <span className="text-white/80">Індивідуальний підхід до кожної дитини</span>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-black mb-2">Запис на пробне заняття</h3>
              <p className="text-gray-500 mb-8">Заповніть форму і ми зв'яжемося з вами</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                    Ім'я батьків та дитини
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Наприклад: Анна та Маша"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-lavender focus:ring-lavender"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                    Номер телефону
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+380 (__) ___-__-__"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-lavender focus:ring-lavender"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-gray-700 mb-2 block">
                    Вік дитини
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Наприклад: 8"
                    min="4"
                    max="16"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-lavender focus:ring-lavender"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-lavender-teal text-black font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Відправка...' : 'Записатись на пробне заняття'}
                </Button>
                
                <p className="text-xs text-gray-400 text-center">
                  Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/10 mb-6">
              <Heart className="w-4 h-4 text-lavender" />
              <span className="text-sm font-medium text-lavender-dark">Відгуки</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Що кажуть <span className="text-gradient">батьки</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Моя донька змінилась до невпізнання! Вона стала впевненішою, навчилася гарно ходити та позувати. Дякуємо Hillary Models!",
                author: "Олена К.",
                role: "Мама Маші, 9 років"
              },
              {
                text: "Чудова школа з професійними педагогами. Син з задоволенням відвідує заняття, а ми бачимо incredible результати!",
                author: "Ірина М.",
                role: "Мама Максима, 7 років"
              },
              {
                text: "Найкраща інвестиція в майбутнє дитини. Не тільки модельні навички, але й розвиток характеру та впевненості.",
                author: "Наталія В.",
                role: "Мами Софії, 12 років"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-lavender text-lavender" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                <div>
                  <p className="font-semibold text-black">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 mb-6">
              <MapPin className="w-4 h-4 text-teal" />
              <span className="text-sm font-medium text-teal-dark">Контакти</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Зв'яжіться з <span className="text-gradient">нами</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-lavender/10 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-lavender" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Адреса</h3>
              <p className="text-gray-600">м. Київ, вул. Модельна, 15</p>
              <p className="text-gray-500 text-sm">(біля метро Палац України)</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-teal" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Телефон</h3>
              <p className="text-gray-600">+380 (67) 123-45-67</p>
              <p className="text-gray-500 text-sm">Щодня з 9:00 до 20:00</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-lavender/10 flex items-center justify-center mx-auto mb-6">
                <Instagram className="w-8 h-8 text-lavender" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Instagram</h3>
              <p className="text-gray-600">@hillary.models</p>
              <p className="text-gray-500 text-sm">Слідкуйте за нашими новинами</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Crown className="w-8 h-8 text-lavender" />
              <span className="text-xl font-bold text-white tracking-tight">
                HILLARY <span className="text-lavender">MODELS</span>
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-sm text-white/60 hover:text-white transition-colors">
                Про нас
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-sm text-white/60 hover:text-white transition-colors">
                Переваги
              </button>
              <button onClick={() => scrollToSection('trial')} className="text-sm text-white/60 hover:text-white transition-colors">
                Пробне заняття
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm text-white/60 hover:text-white transition-colors">
                Контакти
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-lavender/20 transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="tel:+380671234567" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-lavender/20 transition-colors">
                <Phone className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2026 Hillary Models. Всі права захищені.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;