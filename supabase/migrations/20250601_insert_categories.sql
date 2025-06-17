-- Insert category data
DO $$
BEGIN
  -- Insert main categories
  INSERT INTO public.categories (name, slug, description, icon, color, order_index)
  VALUES
    ('Business Analysis', 'business-analysis', 'Core business analysis concepts and methodologies', '📊', '#3B82F6', 1),
    ('Requirements Engineering', 'requirements', 'Gathering, documenting, and validating requirements', '📝', '#10B981', 2),
    ('Process Modeling', 'process-modeling', 'Business process modeling and improvement', '🔄', '#F59E0B', 3),
    ('Data Analysis', 'data-analysis', 'Analyzing and interpreting data for business decisions', '📈', '#8B5CF6', 4),
    ('Agile & Scrum', 'agile', 'Agile methodologies and Scrum framework', '🏃', '#EC4899', 5),
    ('Business Architecture', 'business-architecture', 'Enterprise and business architecture principles', '🏛️', '#6366F1', 6),
    ('Digital Transformation', 'digital-transformation', 'Leading and implementing digital change', '💻', '#14B8A6', 7),
    ('Project Management', 'project-management', 'Project planning, execution, and control', '📅', '#F97316', 8)
  ON CONFLICT (slug) DO UPDATE
  SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    order_index = EXCLUDED.order_index,
    updated_at = now();
    
  -- Wait a moment to ensure main categories are inserted
  PERFORM pg_sleep(0.5);
    
  -- Insert subcategories
  WITH parent_categories AS (
    SELECT id, slug, name FROM public.categories
    WHERE slug IN ('business-analysis', 'requirements', 'process-modeling', 'data-analysis', 'agile', 
                  'business-architecture', 'digital-transformation', 'project-management')
  )
  INSERT INTO public.categories (name, slug, description, icon, color, parent_id, order_index)
  SELECT 
    subcat.name, 
    subcat.slug, 
    subcat.description, 
    subcat.icon, 
    subcat.color, 
    parent.id, 
    subcat.order_index
  FROM (VALUES
    ('BABOK Guide', 'babok-guide', 'Business Analysis Body of Knowledge guide and standards', '📘', '#3B82F6', 'business-analysis', 1),
    ('Business Case Development', 'business-case', 'Creating and presenting business cases', '💼', '#3B82F6', 'business-analysis', 2),
    ('Stakeholder Analysis', 'stakeholder-analysis', 'Identifying and managing stakeholders', '👥', '#3B82F6', 'business-analysis', 3),
     
    ('User Stories', 'user-stories', 'Writing effective user stories', '📖', '#10B981', 'requirements', 1),
    ('Use Cases', 'use-cases', 'Creating detailed use cases', '🔍', '#10B981', 'requirements', 2),
    ('Requirements Elicitation', 'requirements-elicitation', 'Techniques for gathering requirements', '🎯', '#10B981', 'requirements', 3),
     
    ('BPMN', 'bpmn', 'Business Process Model and Notation', '📊', '#F59E0B', 'process-modeling', 1),
    ('Process Improvement', 'process-improvement', 'Techniques for optimizing business processes', '⚙️', '#F59E0B', 'process-modeling', 2),
    ('Value Stream Mapping', 'value-stream-mapping', 'Analyzing and improving value streams', '🔗', '#F59E0B', 'process-modeling', 3),
     
    ('SQL Fundamentals', 'sql-fundamentals', 'Basic SQL for business analysts', '🗃️', '#8B5CF6', 'data-analysis', 1),
    ('Data Visualization', 'data-visualization', 'Creating effective data visualizations', '📊', '#8B5CF6', 'data-analysis', 2),
    ('Business Intelligence', 'business-intelligence', 'BI tools and techniques', '🧠', '#8B5CF6', 'data-analysis', 3),
     
    ('Scrum Framework', 'scrum-framework', 'Understanding and implementing Scrum', '🔄', '#EC4899', 'agile', 1),
    ('Agile BA Role', 'agile-ba-role', 'The business analyst role in Agile teams', '👤', '#EC4899', 'agile', 2),
    ('Kanban', 'kanban', 'Kanban principles and practices', '📋', '#EC4899', 'agile', 3),
    
    ('Enterprise Architecture', 'enterprise-architecture', 'Frameworks and methodologies for enterprise architecture', '🏢', '#6366F1', 'business-architecture', 1),
    ('Business Capability Mapping', 'capability-mapping', 'Identifying and mapping business capabilities', '🗺️', '#6366F1', 'business-architecture', 2),
    ('Business Model Canvas', 'business-model-canvas', 'Visualizing business models', '🖼️', '#6366F1', 'business-architecture', 3),
    
    ('Digital Strategy', 'digital-strategy', 'Developing digital transformation strategies', '🧩', '#14B8A6', 'digital-transformation', 1),
    ('Change Management', 'change-management', 'Managing organizational change', '🔄', '#14B8A6', 'digital-transformation', 2),
    ('Technology Adoption', 'technology-adoption', 'Strategies for successful technology adoption', '🚀', '#14B8A6', 'digital-transformation', 3),
    
    ('Project Planning', 'project-planning', 'Planning and scheduling projects', '📋', '#F97316', 'project-management', 1),
    ('Risk Management', 'risk-management', 'Identifying and mitigating project risks', '⚠️', '#F97316', 'project-management', 2),
    ('Project Governance', 'project-governance', 'Establishing project governance frameworks', '🏛️', '#F97316', 'project-management', 3)
  ) AS subcat(name, slug, description, icon, color, parent_slug, order_index)
  JOIN parent_categories parent ON parent.slug = subcat.parent_slug
  ON CONFLICT (slug) DO UPDATE
  SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    parent_id = EXCLUDED.parent_id,
    order_index = EXCLUDED.order_index,
    updated_at = now();
END $$;
