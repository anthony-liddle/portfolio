import type { MDXComponents } from 'mdx/types';
import CaseStudyLayout from '@/components/CaseStudyLayout';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: CaseStudyLayout,
    ...components,
  };
}
