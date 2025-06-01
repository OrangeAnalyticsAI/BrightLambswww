import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

// This endpoint is for admin use only to upload default avatars to Supabase storage
export async function POST(request: NextRequest) {
  try {
    // Verify admin status
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.user_type !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get default avatars from public directory
    const defaultAvatarsDir = path.join(process.cwd(), 'public', 'images', 'default-avatars');
    const files = fs.readdirSync(defaultAvatarsDir);

    const results = [];

    // Upload each file to Supabase storage
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const filePath = path.join(defaultAvatarsDir, file);
        const fileContent = fs.readFileSync(filePath);
        
        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('default-avatars')
          .upload(file, fileContent, {
            contentType: file.endsWith('.png') ? 'image/png' : 'image/jpeg',
            upsert: true
          });

        if (error) {
          results.push({ file, success: false, error: error.message });
        } else {
          results.push({ file, success: true, path: data.path });
        }
      }
    }

    return NextResponse.json({ 
      message: 'Default avatars uploaded', 
      results 
    });
  } catch (error: any) {
    console.error('Error uploading default avatars:', error);
    return NextResponse.json(
      { error: 'Failed to upload default avatars' },
      { status: 500 }
    );
  }
}
