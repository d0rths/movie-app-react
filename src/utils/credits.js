/**
 * Filter and group crew members by job (Director, Writer, Story)
 * @param {Object} credits - credits from API
 * @returns {Array} - filtered crew members grouped by job
 */
export const getCrewMembers = (credits) => {
  if (!credits?.crew) return [];

  const crewMap = new Map();

  credits.crew.forEach((member) => {
    if (["Director", "Writer", "Story"].includes(member.job)) {
      const key = member.id || member.name;

      if (crewMap.has(key)) {
        const existing = crewMap.get(key);
        if (!existing.job.includes(member.job)) {
          existing.job = `${existing.job}, ${member.job}`;
        }
      } else {
        crewMap.set(key, {
          id: member.id,
          name: member.name,
          job: member.job,
          profile_path: member.profile_path
        });
      }
    }
  });

  const crewArray = Array.from(crewMap.values());

  const jobGroups = {};

  crewArray.forEach((member) => {
    const jobKey = member.job;

    if (!jobGroups[jobKey]) {
      jobGroups[jobKey] = {
        job: jobKey,
        names: [],
        members: []
      };
    }

    jobGroups[jobKey].names.push(member.name);
    jobGroups[jobKey].members.push(member);
  });

  // Повертаємо масив з об'єднаними іменами
  return Object.values(jobGroups).map(group => ({
    job: group.job,
    names: group.names.join(", "),
    members: group.members
  }));
};