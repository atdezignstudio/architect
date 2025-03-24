export const ProjectCard = ({ title, description, tags, tools, image }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      
      <div className="h-48 bg-gray-800 relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mt-4">Tools Used</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {tools.map((tool, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
