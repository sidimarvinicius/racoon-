'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    objective: 'emagrecimento',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const objectives = [
    { value: 'emagrecimento', label: '🏃 Emagrecimento' },
    { value: 'ansiedade', label: '🧘 Superar Ansiedade' },
    { value: 'produtividade', label: '⚡ Produtividade' },
    { value: 'financas', label: '💰 Organizar Finanças' },
    { value: 'relacionamentos', label: '❤️ Relacionamentos' },
    { value: 'habitos', label: '🎯 Criar Hábitos' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro ao digitar
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validação básica
      if (!formData.name.trim()) {
        setError('Por favor, digite seu nome');
        setLoading(false);
        return;
      }

      if (!formData.email.includes('@')) {
        setError('Por favor, digite um email válido');
        setLoading(false);
        return;
      }

      // Enviar para API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao processar cadastro. Tente novamente.');
        setLoading(false);
        return;
      }

      // Sucesso!
      setWelcomeMessage(data.welcomeMessage);
      setSuccess(true);
      setFormData({ name: '', email: '', objective: 'emagrecimento' });

      // Rolar para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-display text-primary">
            Echo
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {success && (
            <div className="mb-8 bg-gradient-to-r from-accent/20 to-primary/20 border border-primary rounded-xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <CheckCircle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold font-display mb-2">
                    Bem-vindo ao Echo, {formData.name.split(' ')[0]}! 🎉
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Seu cadastro foi realizado com sucesso! Aqui está sua mensagem personalizada do Echo:
                  </p>
                  <div className="bg-secondary/40 border border-border rounded-lg p-6 mb-6">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {welcomeMessage}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      📧 Um link de acesso foi enviado para: <span className="font-semibold text-primary">{formData.email}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ⏱️ Seus 14 dias grátis começam AGORA! Sem cartão de crédito necessário.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition-all">
                  Acessar Echo Agora →
                </button>
                <Link
                  href="/"
                  className="flex-1 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all text-center"
                >
                  Voltar para Home
                </Link>
              </div>
            </div>
          )}

          {/* Form Section */}
          {!success && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                  Comece Grátis Agora 🚀
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  14 dias grátis. Sem cartão de crédito. Sem compromisso.
                  Echo vai te conhecer de verdade.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-8 bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive">Erro</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-secondary/40 border border-border rounded-2xl p-8 space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Qual é seu nome?
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Qual é seu e-mail?
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                  />
                </div>

                {/* Objective Field */}
                <div>
                  <label htmlFor="objective" className="block text-sm font-semibold mb-2">
                    Qual é seu objetivo principal?
                  </label>
                  <select
                    id="objective"
                    name="objective"
                    value={formData.objective}
                    onChange={handleChange}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    {objectives.map((obj) => (
                      <option key={obj.value} value={obj.value}>
                        {obj.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 rounded border-border bg-input mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    Concordo com os{' '}
                    <a href="#" className="text-primary hover:underline">
                      Termos de Serviço
                    </a>{' '}
                    e{' '}
                    <a href="#" className="text-primary hover:underline">
                      Política de Privacidade
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    'w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2',
                    loading && 'opacity-75'
                  )}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Começar Meus 14 Dias Grátis →'
                  )}
                </button>

                {/* Info */}
                <p className="text-xs text-muted-foreground text-center">
                  ✅ 14 dias grátis • ✅ Sem cartão • ✅ Cancela quando quiser
                </p>
              </form>

              {/* Trust Signals */}
              <div className="mt-12 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary mb-1">1000+</p>
                  <p className="text-xs text-muted-foreground">Usuários ativos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary mb-1">4.9★</p>
                  <p className="text-xs text-muted-foreground">Avaliação média</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary mb-1">24h</p>
                  <p className="text-xs text-muted-foreground">Suporte disponível</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/40 border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        <p>© 2026 Echo. Feito com ❤️ por Raccoon AI.</p>
      </footer>
    </div>
  );
}
