import numpy as np
def calculate_area(rect):
    """Calculate the area of a rectangle."""
    x1, y1, x2, y2 = rect[:4]
    area = (x2 - x1) * (y2 - y1)
    return area

def calculate_overlap(rect1, rect2):
    """Calculate the area of overlap between two rectangles."""
    x1_overlap = max(rect1[0], rect2[0])
    y1_overlap = max(rect1[1], rect2[1])
    x2_overlap = min(rect1[2], rect2[2])
    y2_overlap = min(rect1[3], rect2[3])

    if x1_overlap < x2_overlap and y1_overlap < y2_overlap:
        return calculate_area([x1_overlap, y1_overlap, x2_overlap, y2_overlap])
    return 0

def eliminate_overlapping_rectangles(rects, threshold=0.75):
    """Group overlapping rectangles and keep the largest in each group."""
    # Append area to each rectangle
    for i in range(len(rects)):
        area = calculate_area(rects[i])
        

    visited = set()
    groups = []

    for i in range(len(rects)):
        if i in visited:
            continue  # Skip already processed rectangles

        current_group = [rects[i]]
        visited.add(i)

        for j in range(len(rects)):
            if i != j and j not in visited:
                overlap_area = calculate_overlap(rects[i], rects[j])
                area_current =calculate_area( rects[i])  # Area is now the fifth element
                area_other = calculate_area( rects[j])  # Area is now the fifth element

                # Calculate overlap ratio
                if overlap_area > 0:
                    overlap_ratio_current = overlap_area / area_current
                    overlap_ratio_other = overlap_area / area_other

                    if overlap_ratio_current > threshold or overlap_ratio_other > threshold:
                        current_group.append(rects[j])
                        visited.add(j)

        # Add the current group to the list of groups
        groups.append(current_group)

    # Select the largest rectangle from each group
    
    return [np.mean(group, axis=0).tolist() for group in groups]


    


