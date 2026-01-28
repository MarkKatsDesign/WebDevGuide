import { error } from '@sveltejs/kit';
import { getTopicBySlug } from '$lib/data/topics';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const topic = getTopicBySlug(params.slug);

	if (!topic) {
		throw error(404, 'Topic not found');
	}

	if (!topic.implemented) {
		throw error(404, 'Topic coming soon');
	}

	return {
		topic
	};
};
