'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Users,
  UserCheck,
  UserPlus,
  Sparkles,
  Search,
  Download
} from 'lucide-react';
import { GuestWithCompanions } from '@/types/guest';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [guests, setGuests] = useState<GuestWithCompanions[]>([]);
  const [stats, setStats] = useState({
    totalGuests: 0,
    totalConfirmed: 0,
    totalCompanions: 0,
    totalAttendees: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для аутентификации
  const handleAuthentication = () => {
    // В реальном проекте здесь должна быть проверка на сервере
    // Для прототипа используем пароль из .env
    if (password === 'admin_password') {
      setAuthenticated(true);
      fetchGuests();
    } else {
      setError('Неверный пароль');
    }
  };

  // Получение списка гостей
  const fetchGuests = async () => {
    try {
      setLoading(true);
      // В реальном проекте здесь должен быть запрос к API
      // Для прототипа имитируем загрузку данных
      setTimeout(() => {
        // Пример данных
        const mockGuests: GuestWithCompanions[] = [];
        const mockStats = {
          totalGuests: 0,
          totalConfirmed: 0,
          totalCompanions: 0,
          totalAttendees: 0,
        };

        setGuests(mockGuests);
        setStats(mockStats);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  // Фильтрация гостей по поисковому запросу
  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Экспорт данных в CSV
  const exportToCSV = () => {
    if (guests.length === 0) return;

    let csvContent = 'Имя,Email,Телефон,Присутствие,Диетические ограничения,Сообщение,Сопровождающие\n';

    guests.forEach((guest) => {
      const companionsStr = guest.companions
        .map((c) => `${c.name} (${c.relationship || 'не указано'})`)
        .join('; ');

      csvContent += `"${guest.name}","${guest.email || ''}","${guest.phone || ''}","${
        guest.attendance ? 'Да' : 'Нет'
      }","${guest.dietaryRestrictions || ''}","${guest.message || ''}","${companionsStr}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `wedding-guests-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center p-4">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Вход в админ-панель</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAuthentication();
                }}
                className="space-y-4"
              >
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  fullWidth
                />
                {error && <p className="text-center text-sm text-red-500">{error}</p>}
                <Button type="submit" fullWidth>
                  Войти
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto flex-1 p-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Управление гостями</h1>

        {/* Статистика */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="mr-4 h-8 w-8 text-blue-light" />
              <div>
                <p className="text-sm text-gray-500">Всего гостей</p>
                <p className="text-2xl font-bold">{stats.totalGuests}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <UserCheck className="mr-4 h-8 w-8 text-blue-light" />
              <div>
                <p className="text-sm text-gray-500">Подтвердили</p>
                <p className="text-2xl font-bold">{stats.totalConfirmed}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <UserPlus className="mr-4 h-8 w-8 text-blue-light" />
              <div>
                <p className="text-sm text-gray-500">Сопровождающие</p>
                <p className="text-2xl font-bold">{stats.totalCompanions}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Sparkles className="mr-4 h-8 w-8 text-blue-light" />
              <div>
                <p className="text-sm text-gray-500">Всего участников</p>
                <p className="text-2xl font-bold">{stats.totalAttendees}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Поиск и экспорт */}
        <div className="mb-6 flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Поиск гостей"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </div>
          <Button
            onClick={exportToCSV}
            disabled={guests.length === 0}
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Экспорт в CSV
          </Button>
        </div>

        {/* Таблица гостей */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500">Загрузка...</p>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500">Пока что нет гостей</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Имя
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Контакты
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Сопровождающие
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Комментарий
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredGuests.map((guest) => (
                      <tr key={guest.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {guest.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {guest.email && (
                              <div className="mb-1">{guest.email}</div>
                            )}
                            {guest.phone && <div>{guest.phone}</div>}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              guest.attendance
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {guest.attendance ? 'Придет' : 'Не придет'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {guest.companions.length > 0 ? (
                              <ul>
                                {guest.companions.map((companion) => (
                                  <li key={companion.id}>
                                    {companion.name}
                                    {companion.relationship && (
                                      <span className="text-xs text-gray-400">
                                        {' '}
                                        ({companion.relationship})
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              'Без сопровождающих'
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {guest.message || '-'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
