'use client';

import { useActionState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createUser } from '../../lib/actions/createUser'
import { Button } from '../ui/button';
export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {}
  })
  return (
    <Card className='w-full max-w-md mx-auto '>
      <CardHeader>
        <CardTitle>ユーザー登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className='space-y-4'>
          <div className="space-y-2">
            <label htmlFor="name">名前</label>
            <input type="text" name='name' id="name" className='border p-2 rounded w-full' />
            {state.errors.name && (
              <p className='text-red-500 text-sm mt-1'>{state.errors.name.join(',')}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email">メールアドレス</label>
            <input type="text" name='email' id="email" className='border p-2 rounded w-full' />
            {state.errors.email && (
              <p className='text-red-500 text-sm mt-1'>{state.errors.email.join(',')}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password">パスワード</label>
            <input type="password" name='password' id="password" className='border p-2 rounded w-full' />
            {state.errors.password && (
              <p className='text-red-500 text-sm mt-1'>{state.errors.password.join(',')}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword">パスワード（確認）</label>
            <input type="password" name='confirmPassword' id="confirmPassword" className='border p-2 rounded w-full' />
            {state.errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>{state.errors.confirmPassword.join(',')}</p>
            )}
          </div>
          <Button type="submit" className='w-full'>登録</Button>
        </form>
      </CardContent>
    </Card>
  )
}