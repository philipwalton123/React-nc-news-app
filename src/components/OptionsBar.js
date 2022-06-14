import { useContext } from "react";
import { Link } from "react-router-dom";
import { TopicsContext } from "../contexts/Topics";

export default function OptionsBar({articlesShowing, SetArticlesShowing}) {
    
    const { topics } = useContext(TopicsContext)
    
    return <section className="options-bar">
        <Link to="/articles">All Articles</Link>
        <select name="sort_by" id="sort_by">
            {topics.map(topic => {
                return <option value={topic.slug}>{topic.slug}</option>
            })}
        </select>
    </section>
}