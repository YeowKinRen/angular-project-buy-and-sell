package com.example.buy_and_sell.repository;

import com.example.buy_and_sell.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {

	List<Message> findByListingIdOrderByTimestampDesc(String listingId);

	List<Message> findByListingIdInOrderByTimestampDesc(List<String> listingIds);
	
	List<Message> findByConversationIdOrderByTimestampAsc(String conversationId);

	@Query(value = """
			SELECT * FROM messages m
			INNER JOIN (
			    SELECT conversation_id, MAX(timestamp) AS max_ts
			    FROM messages
			    WHERE sender_email = :email OR recipient_email = :email
			    GROUP BY conversation_id
			) latest
			ON m.conversation_id = latest.conversation_id AND m.timestamp = latest.max_ts
			""", nativeQuery = true)
	List<Message> findLatestMessagesGroupedByConversation(@Param("email") String email);

}
