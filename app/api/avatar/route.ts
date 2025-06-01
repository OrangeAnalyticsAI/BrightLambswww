import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get the avatar path from the query string
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    
    console.log('Avatar request path:', path);
    console.log('Full request URL:', request.url);

    if (!path) {
      console.error('Avatar path is missing in request');
      return NextResponse.json(
        { error: 'Avatar path is required' },
        { status: 400 }
      );
    }
    
    // Decode the path if it's URL encoded
    const decodedPath = decodeURIComponent(path);

    // Determine which bucket to use
    const isDefault = decodedPath.startsWith('default:');
    const bucket = isDefault ? 'default-avatars' : 'user-avatars';
    const filePath = isDefault ? decodedPath.replace('default:', '') : decodedPath;
    
    console.log('Using bucket:', bucket);
    console.log('File path:', filePath);

    // For debugging, check if the file exists
    if (!isDefault) {
      try {
        // Extract the user ID from the path (first segment)
        const userId = filePath.split('/')[0];
        console.log('User ID from path:', userId);
        
        // List files in the user's directory
        const { data: fileData, error: fileError } = await supabase.storage
          .from(bucket)
          .list(userId);
          
        console.log('Files in user directory:', fileData);
        if (fileError) {
          console.error('Error listing files:', fileError);
        }
        
        // Try to download the file to verify it exists
        const { data: downloadData, error: downloadError } = await supabase.storage
          .from(bucket)
          .download(filePath);
          
        if (downloadError) {
          console.error('Error downloading file:', downloadError);
        } else {
          console.log('File exists and can be downloaded');
        }
      } catch (err) {
        console.error('Error checking file existence:', err);
      }
    }

    // Get the public URL
    console.log('Getting public URL for bucket:', bucket, 'and file path:', filePath);
    
    // First check if the file exists
    if (!isDefault) {
      const { data: fileExists, error: existsError } = await supabase.storage
        .from(bucket)
        .list(filePath.split('/')[0], {
          search: filePath.split('/')[1] // Look for the specific file
        });
        
      if (existsError || !fileExists || fileExists.length === 0) {
        console.error('File does not exist in bucket:', existsError || 'No matching files');
        return NextResponse.json(
          { error: 'Avatar file not found', details: { bucket, filePath } },
          { status: 404 }
        );
      }
    }
    
    // Get the public URL
    const { data } = await supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
      
    // Note: getPublicUrl doesn't actually return an error property
    // It only returns data with the publicUrl
      
    if (!data || !data.publicUrl) {
      console.error('Error getting public URL: No URL returned');
      return NextResponse.json(
        { error: 'Failed to get avatar URL', details: { bucket, filePath } },
        { status: 500 }
      );
    }
    
    console.log('Public URL:', data.publicUrl);

    // If user avatar, verify authentication
    if (!isDefault) {
      // Get user session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Check if user is authenticated
      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      // Check if user has access to this avatar
      // This assumes avatar paths include the user ID as the first folder segment
      const pathSegments = filePath.split('/');
      if (pathSegments[0] !== session.user.id) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }
    }

    console.log('Public URL:', data.publicUrl);
    
    // Instead of redirecting, fetch the image and return it directly
    try {
      const imageResponse = await fetch(data.publicUrl);
      
      if (!imageResponse.ok) {
        console.error('Failed to fetch image from Supabase:', imageResponse.status, imageResponse.statusText);
        return NextResponse.json(
          { error: 'Failed to fetch image from storage', status: imageResponse.status },
          { status: 502 }
        );
      }
      
      const imageArrayBuffer = await imageResponse.arrayBuffer();
      const headers = new Headers();
      
      // Set appropriate content type based on file extension
      const fileExtension = filePath.split('.').pop()?.toLowerCase();
      let contentType = 'image/jpeg'; // Default
      
      if (fileExtension === 'png') contentType = 'image/png';
      else if (fileExtension === 'gif') contentType = 'image/gif';
      else if (fileExtension === 'svg') contentType = 'image/svg+xml';
      else if (fileExtension === 'webp') contentType = 'image/webp';
      
      headers.set('Content-Type', contentType);
      headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
      
      // Return the image directly
      return new NextResponse(imageArrayBuffer, {
        status: 200,
        headers
      });
    } catch (fetchError) {
      console.error('Error fetching image from Supabase:', fetchError);
      
      // Fallback to redirect if direct serving fails
      return NextResponse.redirect(data.publicUrl);  
    }
  } catch (error) {
    console.error('Error getting avatar:', error);
    return NextResponse.json(
      { error: 'Failed to get avatar' },
      { status: 500 }
    );
  }
}
