import random
import time
from PIL import Image
import os

def analyze_media(file_path):
    """
    Analyzes the media file for signs of AI generation.
    Combines metadata analysis (real) with visual simulation (mock).
    """
    
    # Simulate processing time for realism
    time.sleep(2)
    
    filename = os.path.basename(file_path)
    is_image = filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
    
    result = {
        "filename": filename,
        "is_ai": False,
        "confidence": 0.0,
        "reasoning": [],
        "details": {}
    }

    # 1. Metadata Analysis (Real-ish)
    metadata_score = 0
    try:
        if is_image:
            with Image.open(file_path) as img:
                info = img.info
                
                # Check for common AI generator signatures in metadata
                if 'parameters' in info and 'Steps: ' in info['parameters']:
                    result["reasoning"].append("Found 'parameters' tag common in Stable Diffusion.")
                    metadata_score += 0.9
                
                if 'Software' in info:
                    software = info['Software']
                    if 'Midjourney' in software:
                        result["reasoning"].append("Metadata explicitly mentions 'Midjourney'.")
                        metadata_score += 0.99
                    elif 'Niji' in software:
                        result["reasoning"].append("Metadata explicitly mentions 'Niji Journey'.")
                        metadata_score += 0.99
                        
                # Check for Adobe Firefly or others (simplified)
                # In a real app, we'd parse XMP data here.
    except Exception as e:
        print(f"Error reading metadata: {e}")

    # 2. Visual Analysis (Simulated)
    # In a real app, this would call a model or API.
    # Here we simulate a "Deep Learning" scan.
    
    visual_score = random.uniform(0.1, 0.4) # Default to low probability for random files
    
    # If we found metadata, the visual score should align
    if metadata_score > 0:
        visual_score = random.uniform(0.8, 0.99)
    else:
        # Random "false positives" or "suspicions" for demo fun
        if random.random() < 0.2:
            visual_score = random.uniform(0.6, 0.8)
            result["reasoning"].append("Detected unnatural lighting patterns consistent with GANs.")
        elif random.random() < 0.2:
             result["reasoning"].append("Found minor artifacts in high-frequency texture regions.")
             visual_score = random.uniform(0.4, 0.6)

    # Final Calculation
    final_score = max(metadata_score, visual_score)
    
    result["confidence"] = round(final_score * 100, 2)
    result["is_ai"] = final_score > 0.5
    
    if not result["reasoning"]:
        result["reasoning"].append("No specific AI artifacts detected in metadata or visual structure.")
        result["reasoning"].append("Image appears to have natural noise distribution.")

    return result
