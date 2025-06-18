import streamlit as st
import requests
from PIL import Image
import io
import base64
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Page config
st.set_page_config(
    page_title="AI Image Generator",
    page_icon="🎨",
    layout="centered"
)

# Custom CSS
st.markdown("""
    <style>
        .stApp {
            background: linear-gradient(135deg, #4a1d96 0%, #4c1d95 50%, #312e81 100%);
        }
        .stButton>button {
            background-color: #7c3aed;
            color: white;
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            border: none;
            width: 100%;
        }
        .stButton>button:hover {
            background-color: #6d28d9;
        }
        .css-1d391kg {
            padding: 2rem;
            border-radius: 1rem;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
    </style>
""", unsafe_allow_html=True)

# Title
st.title("🎨 AI Image Generator")
st.markdown("<p style='text-align: center; color: #e2e8f0;'>Transform your ideas into stunning images with AI</p>", unsafe_allow_html=True)

# Input
prompt = st.text_input("Describe the image you want to create...", key="prompt")

# Generate button
if st.button("Generate Image", key="generate"):
    if not prompt.strip():
        st.error("Please enter a description")
    else:
        with st.spinner("Creating your image..."):
            try:
                response = requests.post(
                    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {os.getenv('STABILITY_API_KEY', 'YOUR_STABILITY_API_KEY')}"
                    },
                    json={
                        "text_prompts": [{"text": prompt}],
                        "cfg_scale": 7,
                        "height": 1024,
                        "width": 1024,
                        "steps": 30,
                        "samples": 1
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    image_data = base64.b64decode(data["artifacts"][0]["base64"])
                    image = Image.open(io.BytesIO(image_data))
                    st.image(image, caption=prompt, use_column_width=True)
                else:
                    st.error(f"Error: {response.text}")
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

# Footer
st.markdown(
    "<p style='text-align: center; color: #94a3b8; font-size: 0.75rem; margin-top: 2rem;'>Powered by Stability AI</p>",
    unsafe_allow_html=True
)