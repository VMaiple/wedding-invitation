'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type RsvpFormData } from '@/lib/utils/validation';

interface RSVPFormProps {
  className?: string;
  onSubmit?: (data: RsvpFormData) => void;
  onCancel?: () => void;
}

export function RSVPForm({ className, onSubmit, onCancel }: RSVPFormProps) {
  const [formData, setFormData] = useState<RsvpFormData>({
    guest: {
      name: '',
      email: '',
      phone: '',
      attendance: true,
      message: '',
      dietaryRestrictions: '',
      specialRequests: '',
    },
    companions: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleGuestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      guest: {
        ...prev.guest,
        [name]: value,
      },
    }));

    // Простая валидация
    if (name === 'name' && !value.trim()) {
      setErrors((prev) => ({ ...prev, name: 'Введите ваше имя' }));
    } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Некорректный email' }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCompanionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const companions = [...prev.companions];
      companions[index] = {
        ...companions[index],
        [name]: value,
      };
      return { ...prev, companions };
    });
  };

  const addCompanion = () => {
    setFormData((prev) => ({
      ...prev,
      companions: [
        ...prev.companions,
        {
          name: '',
          relationship: '',
          dietaryRestrictions: '',
        },
      ],
    }));
  };

  const removeCompanion = (index: number) => {
    setFormData((prev) => {
      const companions = [...prev.companions];
      companions.splice(index, 1);
      return { ...prev, companions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем имя гостя
    if (!formData.guest.name.trim()) {
      setErrors((prev) => ({ ...prev, name: 'Введите ваше имя' }));
      return;
    }

    // Проверяем email, если он указан
    if (
      formData.guest.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guest.email)
    ) {
      setErrors((prev) => ({ ...prev, email: 'Некорректный email' }));
      return;
    }

    // Проверяем имена всех сопровождающих
    let hasCompanionErrors = false;
    formData.companions.forEach((companion, index) => {
      if (!companion.name.trim()) {
        setErrors((prev) => ({
          ...prev,
          [`companion_${index}_name`]: 'Введите имя сопровождающего',
        }));
        hasCompanionErrors = true;
      }
    });

    if (hasCompanionErrors) return;

    // Если всё в порядке, отправляем данные
    onSubmit?.(formData);
  };

  return (
    <Card
      className={cn('w-full max-w-xl bg-white', className)}
      animate={true}
    >
      <CardHeader>
        <CardTitle className="text-center font-serif text-2xl">
          Подтверждение присутствия
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Информация о госте */}
          <div className="space-y-4">
            <Input
              label="Ваше имя *"
              name="name"
              placeholder="Иван Иванов"
              value={formData.guest.name}
              onChange={handleGuestChange}
              error={errors.name}
              fullWidth
              animated
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.guest.email || ''}
              onChange={handleGuestChange}
              error={errors.email}
              fullWidth
              animated
            />
            <Input
              label="Телефон"
              name="phone"
              placeholder="+7 (999) 123-45-67"
              value={formData.guest.phone || ''}
              onChange={handleGuestChange}
              fullWidth
              animated
            />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Особые пожелания по питанию
              </label>
              <textarea
                name="dietaryRestrictions"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light"
                rows={2}
                placeholder="Вегетарианское меню, аллергии и т.д."
                value={formData.guest.dietaryRestrictions || ''}
                onChange={handleGuestChange}
              />
            </div>
          </div>

          {/* Сопровождающие */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-medium">Сопровождающие</h3>
              <Button
                type="button"
                onClick={addCompanion}
                variant="outline"
                size="sm"
              >
                <Plus size={16} className="mr-1" /> Добавить
              </Button>
            </div>

            {formData.companions.length === 0 && (
              <p className="py-2 text-center text-sm text-gray-500">
                Если вы будете с сопровождающими, добавьте их
              </p>
            )}

            {formData.companions.map((companion, index) => (
              <motion.div
                key={index}
                className="mb-4 rounded-md border border-gray-200 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-blue-light" />
                    <span className="font-medium">Сопровождающий {index + 1}</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeCompanion(index)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-500"
                  >
                    <Minus size={16} />
                  </Button>
                </div>
                <div className="space-y-3">
                  <Input
                    label="Имя *"
                    name="name"
                    placeholder="Имя сопровождающего"
                    value={companion.name}
                    onChange={(e) => handleCompanionChange(index, e)}
                    error={errors[`companion_${index}_name`]}
                    fullWidth
                  />
                  <Input
                    label="Кем приходится"
                    name="relationship"
                    placeholder="Супруг(а), ребенок, друг и т.д."
                    value={companion.relationship || ''}
                    onChange={(e) => handleCompanionChange(index, e)}
                    fullWidth
                  />
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Особые пожелания по питанию
                    </label>
                    <textarea
                      name="dietaryRestrictions"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light"
                      rows={2}
                      placeholder="Вегетарианское меню, аллергии и т.д."
                      value={companion.dietaryRestrictions || ''}
                      onChange={(e) => handleCompanionChange(index, e)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Комментарий */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Комментарий или сообщение для организаторов
            </label>
            <textarea
              name="message"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light"
              rows={3}
              placeholder="Любые пожелания или вопросы"
              value={formData.guest.message || ''}
              onChange={handleGuestChange}
            />
          </div>

          {/* Кнопки */}
          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Отмена
              </Button>
            )}
            <Button type="submit">Подтвердить присутствие</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
