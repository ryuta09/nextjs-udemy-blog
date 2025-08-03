'use client';

import { useActionState } from 'react';
import { authenticate } from '../../lib/actions/authenticate';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from '@/components/ui/label'

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <Card className='w-full max-w-md mx-auto '>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className='space-y-4'>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">メールアドレス</label>
            <input type="email" name="email" id="email" className='border rounded-md p-2' required />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password">パスワード</label>
            <input type="password" name="password" id="password" className='border rounded-md p-2' required />
          </div>
          <Button type='submit' className='w-full'>ログイン</Button>
          <div
            className="flex h-8 items-end space-x-1"
          >
            {errorMessage && (
              <>
                <div className=" text-red-500">
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}